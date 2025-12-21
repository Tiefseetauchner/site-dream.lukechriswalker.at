#!/usr/bin/env bash
set -euo pipefail
shopt -s dotglob

# ---- CONFIG ----
APP_NAME="dreams-backend"
BASE="/var/www/dreams/backend"
STAGING="${BASE}/staging"
RELEASES="${BASE}/releases"
CURRENT="${BASE}/current"
PORT="1338"
HOST="127.0.0.1"
START_CMD=(bun run start -- --port "$PORT" --hostname "$HOST")

# ---- HELPERS ----
log() { printf "\n[%s] %s\n" "$(date '+%F %T')" "$*"; }
die() { printf "\nERROR: %s\n" "$*" >&2; exit 1; }

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"
}

# ---- PRECHECKS ----
require_cmd bun
require_cmd pm2
require_cmd ss
require_cmd timeout
require_cmd ln
require_cmd mv
require_cmd mkdir
require_cmd date
require_cmd rsync

[[ -d "$STAGING" ]] || die "Staging dir not found: $STAGING (rsync into it first)"
[[ -f "$STAGING/package.json" ]] || die "No package.json in staging: $STAGING"
[[ -d "$STAGING/.strapi" ]] || die "No .strapi build output in staging: $STAGING (build on dev machine first)"
[[ -d "$STAGING/node_modules" ]] && log "Note: node_modules exists in staging. That's usually pointless. (We'll still install.)"

mkdir -p "$RELEASES"

# ---- PUBLIC SYNC ----
get_latest_release_dir() {
  local latest=""

  if [[ -L "$CURRENT" || -d "$CURRENT" ]]; then
    latest="$(readlink -f "$CURRENT" 2>/dev/null || true)"
  fi

  if [[ -z "$latest" && -d "$RELEASES" ]]; then
    local newest_name
    newest_name="$(ls -1 "$RELEASES" 2>/dev/null | sort | tail -n 1)"
    [[ -n "$newest_name" ]] && latest="$RELEASES/$newest_name"
  fi

  [[ -n "$latest" ]] && printf '%s\n' "$latest"
}

sync_public_from_previous_release() {
  local previous_release
  previous_release="$(get_latest_release_dir)"

  if [[ -z "$previous_release" ]]; then
    log "No previous release to copy public assets from."
    return
  fi

  if [[ ! -d "$previous_release/public" ]]; then
    log "Previous release missing public dir: $previous_release/public (skipping)."
    return
  fi

  log "Copying public dir from ${previous_release}/public -> ${STAGING}/public"
  mkdir -p "$STAGING/public"
  rsync -a --delete "$previous_release/public/" "$STAGING/public/"
}

sync_public_from_previous_release

# ---- DEP INSTALL IN STAGING ----
log "Installing deps in staging (bun i --frozen-lockfile)…"
pushd "$STAGING" >/dev/null
bun install --frozen-lockfile
popd >/dev/null

# ---- CREATE RELEASE ----
TS="$(date '+%Y%m%d-%H%M%S')"
NEW_RELEASE="${RELEASES}/${TS}"

log "Creating release: ${NEW_RELEASE}"
mkdir -p "$NEW_RELEASE"
mv "$STAGING"/* "$NEW_RELEASE"/
mkdir -p "$STAGING"

# ---- SWITCH SYMLINK + PM2 RESTART ----
log "Stopping pm2 process: ${APP_NAME}"
pm2 stop "$APP_NAME" || true

log "Switching current symlink -> ${NEW_RELEASE}"
ln -sfn "$NEW_RELEASE" "$CURRENT"

log "Reloading and restarting pm2 process"
pm2 reload /var/www/dreams/ecosystem.config.cjs --only dreams-backend --env production --update-env \
  || pm2 restart /var/www/dreams/ecosystem.config.cjs --only dreams-backend --env production --update-env

log "Saving pm2 process: ${APP_NAME}"
pm2 save

log "Done. Current release: $(readlink -f "$CURRENT")"

#!/usr/bin/env bash
set -euo pipefail
shopt -s dotglob

# ---- CONFIG ----
APP_NAME="dreams-clientapp"
BASE="/var/www/dreams/clientapp"
STAGING="${BASE}/staging"
RELEASES="${BASE}/releases"
CURRENT="${BASE}/current"
PORT="3001"
HOST="127.0.0.1"
START_CMD=(bun run start -- --port "$PORT" --hostname "$HOST")
SMOKE_SECONDS="3"

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

[[ -d "$STAGING" ]] || die "Staging dir not found: $STAGING (rsync into it first)"
[[ -f "$STAGING/package.json" ]] || die "No package.json in staging: $STAGING"
[[ -d "$STAGING/.next" ]] || die "No .next build output in staging: $STAGING (build on dev machine first)"
[[ -d "$STAGING/node_modules" ]] && log "Note: node_modules exists in staging. That's usually pointless. (We'll still install.)"

mkdir -p "$RELEASES"

# ---- DEP INSTALL IN STAGING ----
log "Installing deps in staging (bun i --frozen-lockfile)…"
pushd "$STAGING" >/dev/null
bun install --frozen-lockfile
popd >/dev/null

# ---- SMOKE TEST ----
log "Smoke test: start app briefly and verify it listens on ${HOST}:${PORT}…"

SMOKE_PID=""
cleanup_smoke() {
  if [[ -n "${SMOKE_PID}" ]] && kill -0 "${SMOKE_PID}" 2>/dev/null; then
    kill "${SMOKE_PID}" 2>/dev/null || true
    wait "${SMOKE_PID}" 2>/dev/null || true
  fi
}
trap cleanup_smoke EXIT

pushd "$STAGING" >/dev/null

# start in background
("${START_CMD[@]}" >/tmp/dreams-clientapp-smoke.log 2>&1) &
SMOKE_PID=$!

# wait a bit for boot
sleep "$SMOKE_SECONDS"

# check if process died
if ! kill -0 "$SMOKE_PID" 2>/dev/null; then
  log "Smoke test failed: process exited early. Log:"
  tail -n 200 /tmp/dreams-clientapp-smoke.log || true
  exit 1
fi

# check port listening
if ! ss -ltn | awk '{print $4}' | grep -qE "(^|:)${PORT}\$"; then
  log "Smoke test failed: nothing listening on port ${PORT}. Log:"
  tail -n 200 /tmp/dreams-clientapp-smoke.log || true
  exit 1
fi

# kill smoke process
cleanup_smoke
trap - EXIT
popd >/dev/null

log "Smoke test OK."

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

pm2 reload /var/www/dreams/ecosystem.config.cjs --only dreams-clientapp --env production --update-env \
  || pm2 restart /var/www/dreams/ecosystem.config.cjs --only dreams-clientapp --env production --update-env

log "Saving pm2 process: ${APP_NAME}"
pm2 save

log "Done. Current release: $(readlink -f "$CURRENT")"

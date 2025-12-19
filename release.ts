import { execSync } from "child_process";
import dotenv from "dotenv";
import fse from "fs-extra";
import path from "path";

const args = process.argv.slice(2);
const getArg = (key: string, fallback?: string): string | undefined => {
  const arg = args.find((a) => a.startsWith(`${key}=`));
  return arg ? arg.split("=")[1] : process.env[key.toUpperCase()] || fallback;
};

const ENVIRONMENT = getArg("env", "development");

dotenv.config({
  path: path.resolve(process.cwd(), `.env${ENVIRONMENT ? `.${ENVIRONMENT}` : ""}`),
});

const NEXT_BUILD_DIR = getArg("next", "clientapp/.next")!;
const CLIENTAPP_DIR = getArg("clientapp", "clientapp")!;
const BACKEND_DIR = getArg("backend", "backend")!;
const RELEASE_DIR = getArg("release", "build")!;

const DEPLOY_COMMAND = getArg("deploy");

function runCommand(command: string) {
  console.log(`Running: ${command}`);
  execSync(command, { stdio: "inherit" });
}

function cleanReleaseDir() {
  console.log(`Cleaning ${RELEASE_DIR}...`);
  fse.removeSync(RELEASE_DIR);
  fse.ensureDirSync(RELEASE_DIR);
}

function copyBuildOutput(src: string, dest: string) {
  console.log(`Copying from ${src} to ${dest}`);
  fse.copySync(src, dest, { overwrite: true });
}

function copyIfExists(src: string, dest: string) {
  if (!fse.existsSync(src)) {
    console.warn(`Skipping ${src} (not found)`);
    return;
  }

  copyBuildOutput(src, dest);
}

function main() {
  try {
    console.log(`🔨 Building release for ${ENVIRONMENT}...`);

    runCommand("bun run build");
    cleanReleaseDir();

    const clientappReleaseDir = path.join(RELEASE_DIR, "clientapp");
    const backendReleaseDir = path.join(RELEASE_DIR, "backend");

    copyBuildOutput(NEXT_BUILD_DIR, path.join(clientappReleaseDir, ".next"));
    copyIfExists(path.join(CLIENTAPP_DIR, "public"), path.join(clientappReleaseDir, "public"));
    copyIfExists(path.join(CLIENTAPP_DIR, "package.json"), path.join(clientappReleaseDir, "package.json"));
    copyIfExists(path.join(CLIENTAPP_DIR, "bun.lock"), path.join(clientappReleaseDir, "bun.lock"));

    copyIfExists(path.join(BACKEND_DIR, ".strapi"), path.join(backendReleaseDir, ".strapi"));
    copyIfExists(path.join(BACKEND_DIR, "config"), path.join(backendReleaseDir, "config"));
    copyIfExists(path.join(BACKEND_DIR, "dist"), path.join(backendReleaseDir, "dist"));
    copyIfExists(path.join(BACKEND_DIR, "src"), path.join(backendReleaseDir, "src"));
    copyIfExists(path.join(BACKEND_DIR, "package.json"), path.join(backendReleaseDir, "package.json"));
    copyIfExists(path.join(BACKEND_DIR, "bun.lock"), path.join(backendReleaseDir, "bun.lock"));
    copyIfExists(path.join(BACKEND_DIR, "public"), path.join(backendReleaseDir, "public"));
    copyIfExists(path.join(BACKEND_DIR, "types"), path.join(backendReleaseDir, "types"));
    copyIfExists(path.join(BACKEND_DIR, "favicon.png"), path.join(backendReleaseDir, "favicon.png"));
    copyIfExists(path.join(BACKEND_DIR, "tsconfig.json"), path.join(backendReleaseDir, "tsconfig.json"));
    copyIfExists("ecosystem.config.cjs", path.join(RELEASE_DIR, "ecosystem.config.cjs"));
    copyIfExists("./stage-clientapp.sh", path.join(RELEASE_DIR, "stage-clientapp.sh"));
    copyIfExists("./stage-backend.sh", path.join(RELEASE_DIR, "stage-backend.sh"));

    if (DEPLOY_COMMAND) {
      console.log("🚀 Deploying...");
      runCommand(DEPLOY_COMMAND);
    }

    console.log("✅ Release build complete.");
  } catch (err: any) {
    console.error("❌ Build failed:", err.message);
    process.exit(1);
  }
}

main();

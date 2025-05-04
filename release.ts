import { execSync } from "child_process";
import path from "path";
import fse from "fs-extra";
import dotenv from "dotenv";

const args = process.argv.slice(2);
const getArg = (key: string, fallback?: string): string | undefined => {
  const arg = args.find((a) => a.startsWith(`${key}=`));
  return arg ? arg.split("=")[1] : process.env[key.toUpperCase()] || fallback;
};

const ENVIRONMENT = getArg("env", "development");

dotenv.config({
  path: path.resolve(
    process.cwd(),
    `.env${ENVIRONMENT ? `.${ENVIRONMENT}` : ""}`
  ),
});

const VITE_BUILD_DIR = getArg("vite", "clientapp/dist")!;
const BACKEND_DIR = getArg("backend", "backend/")!;
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

function main() {
  try {
    console.log(`🔨 Building release for ${ENVIRONMENT}...`);

    runCommand("bun run build");

    cleanReleaseDir();

    copyBuildOutput(VITE_BUILD_DIR, path.join(RELEASE_DIR, "clientapp"));
    copyBuildOutput(
      `${BACKEND_DIR}/config`,
      path.join(RELEASE_DIR, "backend/config")
    );
    copyBuildOutput(
      `${BACKEND_DIR}/src`,
      path.join(RELEASE_DIR, "backend/src")
    );
    copyBuildOutput(
      `${BACKEND_DIR}/package.json`,
      path.join(RELEASE_DIR, "backend/package.json")
    );
    copyBuildOutput(
      `${BACKEND_DIR}/public`,
      path.join(RELEASE_DIR, "backend/public")
    );
    copyBuildOutput(
      `${BACKEND_DIR}/types`,
      path.join(RELEASE_DIR, "backend/types")
    );

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

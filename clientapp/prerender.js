import { chromium } from "playwright";
import { spawn } from "child_process";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const BASE_URL = "http://localhost:5173"; // Default Vite port
const OUTPUT_DIR = "./prerendered";
const visitedPages = new Set();
const queue = [
  "/",
  "/projects",
  "/about",
  "/blogs",
  "/gallery/photography",
  "/gallery/blender",
  "/links",
];

async function startVite() {
  return new Promise((resolve) => {
    const vite = spawn("bun", ["vite"], { stdio: "inherit" });
    setTimeout(resolve, 3000); // Give Vite time to start
    process.on("exit", () => vite.kill());
  });
}

async function crawlPage(page, url) {
  if (visitedPages.has(url)) return;
  visitedPages.add(url);
  console.log(`Crawling: ${url}`);

  await page.goto(BASE_URL + url, { waitUntil: "networkidle" });

  // Extract HTML
  const html = await page.content();

  // Define directory and file path
  const dirPath = path.join(OUTPUT_DIR, url === "/" ? "" : url);
  const filePath = path.join(dirPath, "index.html");

  // Minimize & Save HTML
  await mkdir(dirPath, { recursive: true });
  await writeFile(filePath, html);

  // Find links to crawl
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a"))
      .map((a) => a.getAttribute("href"))
      .filter(
        (href) =>
          href &&
          href.startsWith("/") &&
          !href.includes("#") &&
          !href.includes("?")
      )
  );

  links.forEach((link) => queue.push(link));
}

(async () => {
  await startVite();
  const browser = await chromium.launch();
  const page = await browser.newPage();

  while (queue.length) {
    const nextUrl = queue.shift();
    await crawlPage(page, nextUrl);
  }

  await browser.close();
  console.log("✅ Pre-rendering complete!");
  process.exit(0);
})();

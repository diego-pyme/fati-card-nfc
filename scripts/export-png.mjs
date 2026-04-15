import { createReadStream } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const port = 4174;
const host = "127.0.0.1";
const baseUrl = `http://${host}:${port}`;
const outputDir = path.join(rootDir, "exports");
const outputPath = path.join(outputDir, "fati-card-static.png");

function getPnpmInvocation(args) {
  if (process.platform === "win32") {
    return {
      command: "cmd.exe",
      commandArgs: ["/c", "corepack", "pnpm", ...args],
      useShell: false,
    };
  }

  return {
    command: "corepack",
    commandArgs: ["pnpm", ...args],
    useShell: false,
  };
}

function runCommand(args) {
  const { command, commandArgs, useShell } = getPnpmInvocation(args);

  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, {
      cwd: rootDir,
      stdio: "inherit",
      shell: useShell,
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on("error", reject);
  });
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".png":
      return "image/png";
    case ".svg":
      return "image/svg+xml";
    case ".json":
      return "application/json; charset=utf-8";
    case ".vcf":
      return "text/vcard; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

async function resolveFilePath(urlPath) {
  const normalizedPath = decodeURIComponent(urlPath.split("?")[0]);
  const relativePath = normalizedPath === "/" ? "index.html" : normalizedPath.slice(1);
  const candidatePath = path.join(distDir, relativePath);

  try {
    const stats = await stat(candidatePath);

    if (stats.isDirectory()) {
      return path.join(candidatePath, "index.html");
    }

    return candidatePath;
  } catch {
    return path.join(distDir, "index.html");
  }
}

async function createStaticServer() {
  const server = createServer(async (request, response) => {
    try {
      const filePath = await resolveFilePath(request.url ?? "/");
      response.writeHead(200, {
        "Content-Type": getContentType(filePath),
      });

      createReadStream(filePath).pipe(response);
    } catch {
      response.writeHead(500, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      response.end("Unable to serve the export route.");
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => resolve());
  });

  return server;
}

async function main() {
  await runCommand(["build"]);
  await mkdir(outputDir, { recursive: true });

  const server = await createStaticServer();

  try {
    const browser = await chromium.launch();

    try {
      const page = await browser.newPage({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
      });

      await page.goto(baseUrl, { waitUntil: "networkidle" });
      await page.screenshot({
        path: outputPath,
        fullPage: false,
      });
    } finally {
      await browser.close();
    }
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  console.log(`PNG exported to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");

const siteRoot = path.resolve(__dirname, "site");
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".svg": "image/svg+xml",
};

function sendText(response, statusCode, message) {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(message);
}

const server = http.createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    sendText(response, 405, "Method not allowed");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    sendText(response, 400, "Invalid URL");
    return;
  }

  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^[/\\]+/, "");
  const filePath = path.resolve(siteRoot, relativePath);
  if (filePath !== siteRoot && !filePath.startsWith(`${siteRoot}${path.sep}`)) {
    sendText(response, 404, "Not found");
    return;
  }

  let content;
  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) {
      sendText(response, 404, "Not found");
      return;
    }
    content = await fs.readFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") {
      sendText(response, 404, "Not found");
      return;
    }
    console.error("Failed to read website file:", error);
    sendText(response, 500, "Internal server error");
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  response.writeHead(200, {
    "Content-Type": contentTypes[extension] || "application/octet-stream",
    "Content-Length": content.length,
    "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  });
  response.end(request.method === "HEAD" ? undefined : content);
});

const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port.");
}

server.listen(port, process.env.HOST || "0.0.0.0", () => {
  console.log(`MC-AUTO-HOST website listening on port ${port}`);
});

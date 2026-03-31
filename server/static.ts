import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { injectSEO } from "./seo-data";

let cachedIndexHtml: string | null = null;

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath, {
    maxAge: '1y',
    immutable: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));

  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (!cachedIndexHtml) {
      cachedIndexHtml = fs.readFileSync(indexPath, "utf-8");
    }
    const html = injectSEO(cachedIndexHtml, req.originalUrl);
    res.set("Content-Type", "text/html").send(html);
  });
}

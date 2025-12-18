import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const SITE_URL = "https://zentrust.world";
const APP_DIR = path.join(process.cwd(), "app");

/**
 * Recursively walk the /app directory and collect all routes
 * that contain a page.tsx file.
 *
 * Excludes:
 * - route groups (folders starting with "(" )
 * - private/internal folders (starting with "_" )
 * - api routes
 */
function collectRoutes(dir: string, route = ""): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    // Exclude private folders, route groups, and api
    if (
      entry.name.startsWith("_") ||
      entry.name.startsWith("(") ||
      entry.name === "api"
    ) {
      return [];
    }

    const fullPath = path.join(dir, entry.name);
    const nextRoute = entry.name === "page.tsx"
      ? route
      : path.join(route, entry.name);

    if (entry.isDirectory()) {
      return collectRoutes(fullPath, nextRoute);
    }

    if (entry.isFile() && entry.name === "page.tsx") {
      return [route || "/"];
    }

    return [];
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = collectRoutes(APP_DIR);

  return routes.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified: new Date(),
  }));
}

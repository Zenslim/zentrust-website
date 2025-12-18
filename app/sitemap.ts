import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const SITE_URL = "https://zentrust.world";
const APP_DIR = path.join(process.cwd(), "app");

function collectRoutes(dir: string, route = ""): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    // Exclusions
    if (
      entry.name.startsWith("_") ||
      entry.name.startsWith("(") ||
      entry.name === "api" ||
      entry.name.includes("[") // exclude dynamic routes
    ) {
      return [];
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nextRoute = `${route}/${entry.name}`;
      return collectRoutes(fullPath, nextRoute);
    }

    if (entry.isFile() && entry.name === "page.tsx") {
      return [route === "" ? "/" : route];
    }

    return [];
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = collectRoutes(APP_DIR);

  return routes
    .filter(
      (route) =>
        !route.startsWith("/stewardship/checkout") &&
        !route.startsWith("/stewardship/thank-you")
    )
    .map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
    }));
}

"use client";

import TinaAdmin from "tinacms/app";
import config from "@/tina/config";

export default function AdminPage() {
  return <TinaAdmin config={config} />;
}

"use client";

import { TinaAdmin } from "tinacms/dist/app";
import config from "@/tina/config";

export default function AdminPage() {
  return <TinaAdmin config={config} />;
}

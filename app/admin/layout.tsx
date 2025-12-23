"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import {
  TinaCMS,
  TinaAdminApi,
  TinaCMSProvider,
  TinaCloudProvider,
  type StaticMedia,
} from "tinacms";

import client from "@/tina/__generated__/client";
import config from "@/tina/config"; // 🔑 THIS WAS MISSING

// No static media collections yet — valid empty map
const staticMedia: StaticMedia = {};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const cms = useMemo(() => {
    const cmsInstance = new TinaCMS({
      enabled: true,
      sidebar: true,
    });

    cmsInstance.flags.set("tina-admin", true);

    // 🔑 Attach Tina schema/config (collections live here)
    cmsInstance.config = config;

    // 🔑 GraphQL API
    cmsInstance.registerApi("tina", client);

    // 🔑 Admin API (expects config to exist)
    cmsInstance.registerApi("admin", new TinaAdminApi(cmsInstance));

    return cmsInstance;
  }, []);

  return (
    <TinaCloudProvider
      tinaGraphQLVersion="0.0.1"
      staticMedia={staticMedia}
    >
      <TinaCMSProvider cms={cms}>
        {children}
      </TinaCMSProvider>
    </TinaCloudProvider>
  );
}

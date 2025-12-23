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

// ✅ Correct shape: map of collections → StaticMediaItem[]
const staticMedia: StaticMedia = {};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const cms = useMemo(() => {
    const cmsInstance = new TinaCMS({
      enabled: true,
      sidebar: true,
    });

    cmsInstance.flags.set("tina-admin", true);

    // Generated GraphQL client (collections, documents)
    cmsInstance.registerApi("tina", client);

    // Admin API
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

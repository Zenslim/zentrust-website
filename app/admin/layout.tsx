"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import {
  TinaCMS,
  TinaAdminApi,
  TinaCMSProvider,
  TinaCloudProvider,
} from "tinacms";
import client from "@/tina/__generated__/client";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const cms = useMemo(() => {
    const cmsInstance = new TinaCMS({
      enabled: true,
      sidebar: true,
    });

    cmsInstance.flags.set("tina-admin", true);

    // Generated GraphQL client (collections, documents, etc.)
    cmsInstance.registerApi("tina", client);

    // Admin API
    cmsInstance.registerApi("admin", new TinaAdminApi(cmsInstance));

    return cmsInstance;
  }, []);

  return (
    <TinaCloudProvider>
      <TinaCMSProvider cms={cms}>{children}</TinaCMSProvider>
    </TinaCloudProvider>
  );
}

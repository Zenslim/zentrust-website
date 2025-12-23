"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import { TinaCMS, TinaAdminApi, TinaCMSProvider } from "tinacms";
import client from "@/tina/__generated__/client";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const cms = useMemo(() => {
    const cmsInstance = new TinaCMS({
      enabled: true,
      sidebar: true,
    });

    cmsInstance.flags.set("tina-admin", true);
    cmsInstance.registerApi("tina", client);
    cmsInstance.registerApi("admin", new TinaAdminApi(cmsInstance));

    return cmsInstance;
  }, []);

  return <TinaCMSProvider cms={cms}>{children}</TinaCMSProvider>;
}

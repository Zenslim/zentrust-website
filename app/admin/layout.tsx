"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import { TinaProvider } from "tinacms/dist/toolkit";
import { TinaAdminApi, TinaCMS } from "tinacms";
import client from "@/tina/__generated__/client";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const cms = useMemo(() => {
    const instance = new TinaCMS({
      enabled: true,
      sidebar: true,
    });

    instance.flags.set("tina-admin", true);
    instance.registerApi("tina", client);
    instance.registerApi("admin", new TinaAdminApi(instance));

    return instance;
  }, []);

  return <TinaProvider cms={cms}>{children}</TinaProvider>;
}

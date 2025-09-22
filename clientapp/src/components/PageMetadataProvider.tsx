"use client";

import { resolvePageMetadata, type PageMetadata } from "@/config/pageMetadata";
import { usePathname } from "next/navigation";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type PageMetadataUpdate = Partial<Pick<PageMetadata, "title" | "subtitle" | "description">>;

type PageMetadataContextValue = {
  metadata: PageMetadata;
  updateMetadata: (update: PageMetadataUpdate) => void;
};

const PageMetadataContext = createContext<PageMetadataContextValue | null>(null);

function sanitizeUpdate(update: PageMetadataUpdate): PageMetadataUpdate {
  return Object.fromEntries(
    Object.entries(update).filter(([, value]) => value !== undefined && value !== null),
  ) as PageMetadataUpdate;
}

export function PageMetadataProvider({ children }: PropsWithChildren) {
  const pathname = usePathname() ?? "/";

  const baseMetadata = useMemo<PageMetadata>(() => {
    const resolved = resolvePageMetadata(pathname);
    return { ...resolved };
  }, [pathname]);

  const [metadata, setMetadata] = useState<PageMetadata>(baseMetadata);

  useEffect(() => {
    setMetadata(baseMetadata);
  }, [baseMetadata]);

  const updateMetadata = useCallback((update: PageMetadataUpdate) => {
    const sanitized = sanitizeUpdate(update);
    if (Object.keys(sanitized).length === 0) {
      return;
    }
    setMetadata((previous) => ({ ...previous, ...sanitized }));
  }, []);

  const value = useMemo<PageMetadataContextValue>(
    () => ({
      metadata,
      updateMetadata,
    }),
    [metadata, updateMetadata],
  );

  return (
    <PageMetadataContext.Provider value={value}>
      {children}
    </PageMetadataContext.Provider>
  );
}

export function usePageMetadata(): PageMetadataContextValue {
  const context = useContext(PageMetadataContext);

  if (!context) {
    throw new Error("usePageMetadata must be used within a PageMetadataProvider");
  }

  return context;
}

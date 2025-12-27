"use client";

import { type PageMetadataUpdate, usePageMetadata } from "@/components/PageMetadataProvider";
import { useEffect } from "react";

export function PageMetadata({ title, subtitle, description }: PageMetadataUpdate) {
  const { updateMetadata } = usePageMetadata();

  useEffect(() => {
    updateMetadata({ title, subtitle, description });
  }, [updateMetadata, title, subtitle, description]);

  return null;
}

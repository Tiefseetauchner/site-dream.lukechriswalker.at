"use client";

import { useEffect } from "react";
import {
  type PageMetadataUpdate,
  usePageMetadata,
} from "@/components/PageMetadataProvider";

export function PageMetadata({ title, subtitle, description }: PageMetadataUpdate) {
  const { updateMetadata } = usePageMetadata();

  useEffect(() => {
    updateMetadata({ title, subtitle, description });
  }, [updateMetadata, title, subtitle, description]);

  return null;
}

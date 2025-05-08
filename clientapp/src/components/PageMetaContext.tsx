import { createContext, useContext } from "react";

export interface PageMetadata {
  title: string;
  description: string;
}

interface PageMeta {
  pageTitle: string;
  pageDescription: string;
  setPageMeta: (meta: PageMetadata) => void;
}

export const PageMetaContext = createContext<PageMeta>({
  pageTitle: "",
  pageDescription: "",
  setPageMeta: (meta: PageMetadata) => {
    if (process.env.NODE_ENV === "development") {
      console.warn("setPageMeta called outside of provider.", meta);
    }
  },
});

export const usePageMeta = () => useContext<PageMeta>(PageMetaContext);

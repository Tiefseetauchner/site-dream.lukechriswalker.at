import { PropsWithChildren, useEffect, useState } from "react";
import { PageMetadata, PageMetaContext } from "./PageMetaContext";

export const PageMetaProvider = ({ children }: PropsWithChildren) => {
  const [pageMeta, setPageMeta] = useState<PageMetadata>({
    title: "",
    description: "",
  });

  useEffect(() => {
    document.title = `Dreams | ${pageMeta.title}`;

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute("content", pageMeta.description);
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.name = "description";
      newMetaDescription.content = pageMeta.description;
      document.head.appendChild(newMetaDescription);
    }
  }, [pageMeta]);

  return (
    <PageMetaContext.Provider
      value={{
        pageTitle: pageMeta.title,
        pageDescription: pageMeta.description,
        setPageMeta,
      }}
    >
      {children}
    </PageMetaContext.Provider>
  );
};

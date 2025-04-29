import { PropsWithChildren, useEffect, useState } from "react";
import { PageTitleContext } from "./PageTitleContext";

export const PageTitleProvider = ({ children }: PropsWithChildren) => {
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    document.title = `Dreams | ${pageTitle}`;
  }, [pageTitle]);

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

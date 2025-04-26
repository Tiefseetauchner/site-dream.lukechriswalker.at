import { PropsWithChildren, useState } from "react";
import { PageTitleContext } from "./PageTitleContext";

export const PageTitleProvider = ({ children }: PropsWithChildren) => {
  const [pageTitle, setPageTitle] = useState("");

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

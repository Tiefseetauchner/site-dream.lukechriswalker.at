import { createContext, useContext } from "react";

export const PageTitleContext = createContext({
  pageTitle: "",
  setPageTitle: (title: string) => {
    console.log(title);
  },
});

export const usePageTitle = () => useContext(PageTitleContext);

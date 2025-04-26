import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ErrorPage } from "../components/pages/ErrorPage";
import { HomePage } from "../components/pages/HomePage";
import { BooksOverviewPage } from "../components/pages/Books/BooksOverviewPage";

export const routes = {
  home: "/",
  books: "/books",
  book: (id: number) => `/books/${id}`,
  contact: "/contact",
};

export const router = createBrowserRouter([
  {
    path: routes.home,
    Component: Layout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: routes.books,
        Component: BooksOverviewPage,
      },
    ],
  },
]);

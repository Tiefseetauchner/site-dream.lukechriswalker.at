import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ErrorPage } from "../components/pages/ErrorPage";
import { HomePage } from "../components/pages/HomePage";
import { BooksOverviewPage } from "../components/pages/Books/BooksOverviewPage";
import { BooksDetailsPage } from "../components/pages/Books/BooksDetailsPage";
import { CharactersOverviewPage } from "../components/pages/Characters/CharactersOverviewPage";
import { CharactersDetailsPage } from "../components/pages/Characters/CharactersDetailsPage";
import { AuthorPage } from "../components/pages/Authors/AuthorPage";

export const routes = {
  home: "/",
  books: "/books",
  book: (id: string) => `/books/${id}`,
  characters: "/characters",
  character: (id: string) => `/characters/${id}`,
  mainAuthor: "/authors/lena-tauchner",
  author: (id: string) => `/authors/${id}`,
  contact: "/contact",
};

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
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
        {
          path: routes.book(":id"),
          Component: BooksDetailsPage,
        },
        {
          path: routes.characters,
          Component: CharactersOverviewPage,
        },
        {
          path: routes.character(":id"),
          Component: CharactersDetailsPage,
        },
        {
          path: routes.author(":id"),
          Component: AuthorPage,
        },
      ],
    },
  ]);

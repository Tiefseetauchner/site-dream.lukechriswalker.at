import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../components/pages/HomePage";
import { Layout } from "../components/Layout";
import { ErrorPage } from "../components/pages/ErrorPage";
export const routes = {
  root: "/",
};

export const router = createBrowserRouter([{
  path: "/",
  Component: Layout,
  ErrorBoundary: ErrorPage,
  children: [
    { path: routes.root, Component: HomePage },
  ],
}]);

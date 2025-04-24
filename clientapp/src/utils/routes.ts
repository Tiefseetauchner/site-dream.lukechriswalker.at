import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ErrorPage } from "../components/pages/ErrorPage";
import { HomePage } from "../components/pages/HomePage";

export const routes = {
  home: '/'
}

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
    ]
  }
])
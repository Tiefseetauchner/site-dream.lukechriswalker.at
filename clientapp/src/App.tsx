import { RouterProvider } from "react-router-dom";
import { router } from "./utils/routes";
import { PageTitleProvider } from "./components/PageTitleProvider";

function App() {
  return (
    <>
      <PageTitleProvider>
        <RouterProvider router={router}></RouterProvider>
      </PageTitleProvider>
    </>
  );
}

export default App;

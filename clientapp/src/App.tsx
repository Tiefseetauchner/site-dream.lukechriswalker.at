import { RouterProvider } from "react-router-dom";
import { router } from "./utils/routes";
import { PageMetaProvider } from "./components/PageMetaProvider";

function App() {
  return (
    <>
      <PageMetaProvider>
        <RouterProvider router={router}></RouterProvider>
      </PageMetaProvider>
    </>
  );
}

export default App;

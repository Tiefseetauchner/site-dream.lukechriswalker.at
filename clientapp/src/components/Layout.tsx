import { Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark"></Navbar>
      <main>
        <Outlet />
      </main>
    </>
  );
};

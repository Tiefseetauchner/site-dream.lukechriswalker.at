import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          height: "calc(100vh - 90px)",
          width: "calc(100vw - 90px)",
          padding: "45px",
          backgroundColor: "#131016",
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "40px",
          overflow: "hidden",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

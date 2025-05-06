import { faBars, faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Navbar, Nav } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { routes } from "../utils/routes";
import styles from "./Shared.module.scss";
import { usePageTitle } from "./PageTitleContext";

export function Layout() {
  const { pageTitle } = usePageTitle();

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
      <div className={styles.mainContainer}>
        <Row
          style={{
            marginBottom: "60px",
            marginTop: "10px",
            position: "relative",
          }}
        >
          <Navbar expand="lg">
            <div
              style={{
                position: "relative",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                padding:
                  "var(--bs-navbar-padding-y) var(--bs-navbar-padding-x)",
                flexShrink: "0",
                width: "100%",
                maxWidth: "100%",
              }}
            >
              <Link
                to={routes.home}
                className="text-decoration-none"
                style={{
                  position: "absolute",
                  left: "0",
                }}
              >
                <Navbar.Brand>
                  <img src="/logo.png" alt="Logo" style={{ width: "50px" }} />
                </Navbar.Brand>
              </Link>
              <Link
                to={routes.contact}
                className="text-decoration-none"
                style={{
                  position: "absolute",
                  right: "0",
                }}
              >
                <Navbar.Brand>
                  <FontAwesomeIcon
                    title="Contact"
                    icon={faFeather}
                    color={"#9a8d3b"}
                    style={{ width: "50px" }}
                  />
                </Navbar.Brand>
              </Link>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{
                  position: "absolute",
                  right: "55px",
                }}
              >
                <FontAwesomeIcon icon={faBars} color={"#9a8d3b"} />
              </Navbar.Toggle>
              <Nav
                className="gap-3 d-none d-lg-flex"
                style={{ position: "absolute", left: "90px" }}
              >
                <NavLink to={routes.home}>Home</NavLink>
                <NavLink to={routes.books}>Books</NavLink>
              </Nav>
              <h1
                className={`${styles.title} position-absolute start-50 translate-middle-x`}
              >
                {pageTitle}
              </h1>
              <Nav
                className="gap-3 d-none d-lg-flex"
                style={{ position: "absolute", right: "90px" }}
              >
                <NavLink to={routes.characters}>Characters</NavLink>
                <NavLink to={routes.mainAuthor}>Author</NavLink>
              </Nav>
            </div>
            <Navbar.Collapse
              id="basic-navbar-nav"
              style={{ paddingTop: "50px" }}
            >
              <Nav className="d-lg-none">
                <NavLink to={routes.home}>Home</NavLink>
                <NavLink to={routes.books}>Books</NavLink>
                <NavLink to={routes.characters}>Characters</NavLink>
                <NavLink to={routes.mainAuthor}>Author</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        <Outlet />
        <div
          className={"d-block d-md-none"}
          style={{
            width: "100%",
            padding: "0 10px",
            textAlign: "center",
          }}
        >
          <span className={styles.text}>
            <Link to={routes.imprint}>Imprint</Link> |{" "}
            <Link to={routes.contact}>Contact</Link> |{" "}
            <Link to={routes.privacy}>Privacy</Link> |{" "}
            <Link to={routes.license}>Licenses</Link> | Content and Images ©
            2025 Lena Tauchner
          </span>
        </div>
      </div>
      <div
        className={"d-none d-md-block"}
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          padding: "0 10px",
          textAlign: "center",
          backgroundColor: "#000",
          zIndex: "1000",
        }}
      >
        <span className={styles.text}>
          <Link to={routes.imprint}>Imprint</Link> |{" "}
          <Link to={routes.contact}>Contact</Link> |{" "}
          <Link to={routes.privacy}>Privacy</Link> |{" "}
          <Link to={routes.license}>Licenses</Link> | Content and Images © 2025
          Lena Tauchner
        </span>
      </div>
    </div>
  );
}

interface NavLinkProps extends React.PropsWithChildren {
  to: string;
}

function NavLink({ to, children }: NavLinkProps) {
  return (
    <Nav.Item>
      <Link to={to} className="text-decoration-none">
        <span className={styles.text}>{children}</span>
      </Link>
    </Nav.Item>
  );
}

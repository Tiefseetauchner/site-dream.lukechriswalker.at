import { Button, Container } from "react-bootstrap";

import { Link, useRouteError } from "react-router-dom";
import { routes } from "../../utils/routes";

export function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <Container className="mt-5 text-center">
      <h1>Oops! An error occurred</h1>
      <p>
        {error.statusText ||
          error.message ||
          "An unexpected error has occurred."}
      </p>
      <Link to={routes.home}>
        <Button>Go to Home</Button>
      </Link>
    </Container>
  );
}

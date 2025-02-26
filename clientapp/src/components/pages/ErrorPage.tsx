import React from "react";
import { Button, Container } from "react-bootstrap";

import { useRouteError } from "react-router-dom";
import { routes } from "../../utils/routes";

export const ErrorPage: React.FC = () => {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <Container className="mt-5 text-center">
      <h1>Oops! An error occurred</h1>
      <p>
        {error.statusText || error.message ||
          "An unexpected error has occurred."}
      </p>
      <Button
        variant="primary"
        onClick={() => window.location.href = routes.root}
      >
        Go to Homepage
      </Button>
    </Container>
  );
};

import { Container, Row, Col } from "react-bootstrap";
import { usePageTitle } from "../PageTitleContext";

export function HomePage() {
  const { setPageTitle } = usePageTitle();
  setPageTitle("Home");

  return (
    <>
      <Container>
        <Row className="align-items-center py-3">
          <Col xs={12} className="text-center">
            <h4>
              <em>
                Not all dreams are gentle. Some cut deep. Some teach you who you
                are.
              </em>
            </h4>
          </Col>
        </Row>
        <Row className="py-3">
          <Col md={12} lg={6}>
            {/* <BlocksRenderer content={} /> */}
          </Col>
          <Col md={6}></Col>
        </Row>
      </Container>
    </>
  );
}

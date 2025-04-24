import { Col, Container, DropdownDivider, Image, Row } from "react-bootstrap";
import styles from "./HomePage.module.scss";

export function HomePage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
      className={styles.container}
    >
      <Container>
        <span className={styles.title}>
          <h1>Dreams</h1>
        </span>
      </Container>
      <Container>
        <Row>
          <Col className="text-center" xs={12} md={6}>
            <h2>Dream</h2>
            <Image src={"/dream.jpg"} className={styles.coverImg} />
            <p>
              <em>
                In submission, We find safety.
                <br />
                In obedience, We find freedom.
                <br />
                In love, We find each other.
              </em>
            </p>
          </Col>
          <Col className="text-center" xs={12} md={6}>
            <h2>Reality</h2>
            <Image src={"/reality.jpg"} className={styles.coverImg} />
            <p>
              <em>
                In submission, We find safety.
                <br />
                In obedience, We find freedom.
                <br />
                In love, We find each other.
              </em>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

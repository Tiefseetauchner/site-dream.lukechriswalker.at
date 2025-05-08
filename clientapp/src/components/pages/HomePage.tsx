import { Container, Row, Col } from "react-bootstrap";
import { usePageMeta } from "../PageMetaContext";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useEffect, useState } from "react";
import { SingleTypeResponse } from "../../../types/types";
import { client } from "../../strapiClient";

export function HomePage() {
  const { setPageMeta } = usePageMeta();

  const [homePageTexts, setHomePageTexts] =
    useState<SingleTypeResponse<"api::home-page.home-page">>();

  useEffect(() => {
    async function getHomePageTexts() {
      const data = (await client
        .single("home-page")
        .find()) as unknown as SingleTypeResponse<"api::home-page.home-page">;

      setHomePageTexts(data);
    }

    setPageMeta({
      title: "Dreams",
      description:
        "Not all dreams are gentle. Some cut deep. Some teach you who you are... Welcome to the official website of the Dreams series!",
    });

    getHomePageTexts();
  }, []);

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
            {homePageTexts?.data.left_text && (
              <BlocksRenderer content={homePageTexts.data.left_text} />
            )}
          </Col>
          <Col md={12} lg={6}>
            {homePageTexts?.data.right_text && (
              <BlocksRenderer content={homePageTexts.data.right_text} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

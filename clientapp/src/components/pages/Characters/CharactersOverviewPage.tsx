import { useEffect, useState } from "react";
import { CollectionTypeResponse } from "../../../../types/types";
import { client } from "../../../strapiClient";
import { usePageTitle } from "../../PageTitleContext";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { routes } from "../../../utils/routes";

export function CharactersOverviewPage() {
  const { setPageTitle } = usePageTitle();
  setPageTitle("Characters");

  const [characters, setCharacters] =
    useState<CollectionTypeResponse<"api::character.character">>();

  useEffect(() => {
    async function getCharacters() {
      const data = (await client.collection("characters").find({
        populate: ["profile_picture"],
      })) as unknown as CollectionTypeResponse<"api::character.character">;

      setCharacters(data);
    }

    getCharacters();
  }, []);

  return (
    <>
      <Container>
        <Row className="align-items-center py-3">
          <Col xs={12} className="text-center">
            <h4>
              <em>
                "The scene isn't just kink - it's people, Sandra." ~ Christoph
              </em>
            </h4>
          </Col>
        </Row>
        <Row>
          {characters?.data.map((character) => (
            <Col
              xs={12}
              md={6}
              xl={3}
              key={character.name}
              className="p-3 text-center"
            >
              <Link
                to={routes.character(character.slug ?? "unknown")}
                className="text-decoration-none"
              >
                <h2>{character.name}</h2>
              </Link>
              <p>
                <em>{character.blurb}</em>
              </p>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

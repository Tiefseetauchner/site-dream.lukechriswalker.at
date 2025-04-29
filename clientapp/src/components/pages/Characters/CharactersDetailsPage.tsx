import { useEffect, useState } from "react";
import { CollectionTypeResponse } from "../../../../types/types";
import { usePageTitle } from "../../PageTitleContext";
import { client } from "../../../strapiClient";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Col, Container, Row } from "react-bootstrap";
import characterStyles from "./CharactersDetailPage.module.scss";
import styles from "../../Shared.module.scss";

export function CharactersDetailsPage() {
  const { id } = useParams();

  const { setPageTitle } = usePageTitle();
  setPageTitle("Profile");

  const [character, setCharacter] =
    useState<CollectionTypeResponse<"api::character.character">>();

  useEffect(() => {
    async function getCharacters() {
      const data = (await client.collection("characters").find({
        filters: {
          slug: {
            $eq: id,
          },
        },
        populate: ["profile_picture"],
      })) as unknown as CollectionTypeResponse<"api::character.character">;

      setCharacter(data);
    }

    getCharacters();
  }, [id]);

  return (
    <Container>
      <Row>
        <Col>
          <span className={characterStyles.characterName + " " + styles.text}>
            {character?.data[0].name}
          </span>
          {character?.data[0].birthday && (
            <span
              className={characterStyles.characterBirthday + " " + styles.text}
            >
              Born on{" "}
              {moment(character.data[0].birthday).format("MMMM Do, YYYY")}
            </span>
          )}
        </Col>
      </Row>
      <p className={characterStyles.characterBlurb + " " + styles.text}>
        {character?.data[0].blurb}
      </p>
      {character?.data[0].description && (
        <BlocksRenderer content={character?.data[0].description} />
      )}
    </Container>
  );
}

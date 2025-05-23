import { useEffect, useState } from "react";
import { CollectionTypeResponse } from "../../../../types/types";
import { usePageMeta } from "../../PageMetaContext";
import { client } from "../../../strapiClient";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Col, Container, Row } from "react-bootstrap";
import characterStyles from "./CharactersDetailPage.module.scss";
import styles from "../../Shared.module.scss";

export function CharactersDetailsPage() {
  const { id } = useParams();

  const { setPageMeta } = usePageMeta();

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
        populate: ["profile_picture", "books"],
      })) as unknown as CollectionTypeResponse<"api::character.character">;

      setCharacter(data);

      const name = data?.data[0].name;
      const blurb = data?.data[0].blurb?.slice(0, 140);
      const characterMetaDescription = `${name} - Dreams series character overview. ${blurb}`;

      setPageMeta({ title: "Profile", description: characterMetaDescription });
    }

    setPageMeta({ title: "Profile", description: "Character Profile" });

    getCharacters();
  }, [id]);

  return (
    <Container>
      <Row>
        <Col>
          <h2 className={characterStyles.characterName + " " + styles.text}>
            {character?.data[0].name}
          </h2>
          {character?.data[0].birthday && (
            <span
              className={characterStyles.characterBirthday + " " + styles.text}
            >
              Born on{" "}
              {moment(character.data[0].birthday).format("MMMM Do, YYYY")}
            </span>
          )}
          {character?.data[0].blurb && (
            <p className={characterStyles.characterBlurb + " " + styles.text}>
              {character?.data[0].blurb}
            </p>
          )}
          {character?.data[0].description && (
            <BlocksRenderer content={character?.data[0].description} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {character?.data[0].books?.length > 0 && (
            <>
              <h3>Appears on:</h3>
              <ul>
                {character?.data[0].books?.map(
                  (book: { id: number; title: string; slug: string }) => (
                    <li key={book.id}>
                      <a href={`/books/${book.slug}`}>{book.title}</a>
                    </li>
                  )
                )}
              </ul>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Col, Container, Row } from "react-bootstrap";
import { usePageMeta } from "../../PageMetaContext";
import { useEffect, useState } from "react";
import { CollectionTypeResponse } from "../../../../types/types";
import { client, resolveMedia } from "../../../strapiClient";
import { Link, useParams } from "react-router-dom";
import { routes } from "../../../utils/routes";
import styles from "../../Shared.module.scss";

export function AuthorPage() {
  const { id } = useParams();

  const { setPageMeta } = usePageMeta();

  const [author, setAuthor] =
    useState<CollectionTypeResponse<"api::author.author">>();

  useEffect(() => {
    async function getAuthor() {
      const data = (await client.collection("authors").find({
        filters: {
          slug: {
            $eq: id,
          },
        },
        populate: ["profile_picture", "books"],
      })) as unknown as CollectionTypeResponse<"api::author.author">;

      setAuthor(data);

      setPageMeta({
        title: "Author",
        description: `${data.data[0].name} - author of the Dreams series, with ${data.data[0].books.length} published book${data.data[0].books.length === 1 ? "" : "s"}.`,
      });
    }

    setPageMeta({ title: "Author", description: "" });

    getAuthor();
  }, [id]);

  return (
    <>
      <Container>
        <Row className="align-items-center py-3">
          <Col xs={12} className="text-center">
            <h4>
              <em>{author?.data[0].blurb}</em>
            </h4>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={3}>
            <img
              className="img-fluid"
              style={{ borderRadius: "15px" }}
              src={resolveMedia(author?.data[0].profile_picture?.url)}
              alt={author?.data[0].profile_picture?.alternativeText}
            />
            <p>
              Stories:
              <br />
              {author?.data[0].books?.map(
                (book: { title: string; slug: string }) => (
                  <>
                    <Link to={routes.book(book.slug)}>
                      <span className={styles.text}>{book.title}</span>
                    </Link>
                    <br />
                  </>
                )
              )}
            </p>
          </Col>
          <Col sm={12} md={9}>
            <h2>{author?.data[0].name}</h2>
            {author?.data[0].description && (
              <BlocksRenderer content={author.data[0].description} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

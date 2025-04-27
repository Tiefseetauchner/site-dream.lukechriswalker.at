import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { client } from "../../../strapiClient";
import { CollectionTypeResponse } from "../../../../types/types";
import { usePageTitle } from "../../PageTitleContext";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../Shared.module.scss";
import bookStyles from "./BooksDetailsPage.module.scss";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { routes } from "../../../utils/routes";

export function BooksDetailsPage() {
  const { id } = useParams();

  const { setPageTitle } = usePageTitle();

  const [books, setBooks] =
    useState<CollectionTypeResponse<"api::book.book">>();

  useEffect(() => {
    async function getBooks() {
      if (id) {
        const data = (await client.collection("books").find({
          filters: {
            slug: {
              $eq: id,
            },
          },
          populate: ["cover_image", "authors"],
        })) as unknown as CollectionTypeResponse<"api::book.book">;

        setBooks(data);
        setPageTitle(data.data[0].title ?? "");
      }
    }

    getBooks();
  }, [id, setPageTitle]);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <img
            className={bookStyles.coverImage}
            src={books?.data[0].cover_image.url}
            alt={books?.data[0].cover_image.alternativeText}
          />
        </Col>
        <Col md={8}>
          <h2 className={bookStyles.infoTitle}>Author</h2>
          <p>
            {books?.data[0].authors.map(
              (author: { name: string; slug: string }) => (
                <Link to={routes.author(author.slug)}>
                  <span className={styles.text}>{author.name}</span>
                </Link>
              )
            )}
          </p>
          <h2 className={bookStyles.infoTitle}>Content Warnings</h2>
          <p style={{ whiteSpace: "preserve-breaks" }}>
            {books?.data[0].content_warnings}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h2 className={bookStyles.infoTitle}>Description</h2>
          {books?.data[0].description && (
            <BlocksRenderer content={books?.data[0].description} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

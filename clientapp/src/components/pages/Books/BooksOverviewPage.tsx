import { useEffect, useState } from "react";
import { CollectionTypeResponse } from "../../../../types/types";
import { Col, Container, Row } from "react-bootstrap";
import { client, resolveMedia } from "../../../strapiClient";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { usePageMeta } from "../../PageMetaContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export function BooksOverviewPage() {
  const { setPageMeta } = usePageMeta();

  const [books, setBooks] =
    useState<CollectionTypeResponse<"api::book.book">>();

  useEffect(() => {
    async function getBooks() {
      const data = (await client.collection("books").find({
        status: "published",
        populate: ["cover_image", "authors"],
        sort: ["order"],
      })) as unknown as CollectionTypeResponse<"api::book.book">;

      setBooks(data);
    }

    setPageMeta({
      title: "Books",
      description:
        "Discover the Dreams book series - emotionally charged fiction exploring power exchange, healing, kink, and complex relationships.",
    });

    getBooks();
  }, []);

  return (
    <Container fluid>
      <Row className="align-items-center py-3">
        <Col xs={12} className="text-center">
          <h4>
            <em>The stories of dreams are the stories of our lives.</em>
          </h4>
        </Col>
      </Row>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={70}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
        }}
        pagination={{ clickable: true }}
        navigation={true}
        style={{
          maxWidth: "1200px",
        }}
      >
        {books?.data.map((book) => (
          <SwiperSlide style={{ overflow: "auto" }}>
            <Link to={`/books/${book.slug}`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  overflow: "auto",
                }}
              >
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "60vh",
                  }}
                  src={resolveMedia(book.cover_image.url)}
                  alt={book.cover_image.alternativeText}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

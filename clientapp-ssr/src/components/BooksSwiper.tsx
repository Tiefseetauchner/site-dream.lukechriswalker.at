"use client";

import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface SwiperBook {
  slug: string;
  cover_image: {
    url: string;
    alternativeText: string;
    width: number;
    height: number;
  };
}

export function BooksSwiper({ books }: { books: SwiperBook[] }) {
  return <>
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
      {books?.map((book) => (
        <SwiperSlide key={book.slug} style={{ overflow: "auto" }}>
          <Link href={`/books/${book.slug}`}>
            <div>
              <Image
                src={book.cover_image.url}
                alt={book.cover_image.alternativeText}
                width={book.cover_image.width}
                height={book.cover_image.height}
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </>;
}

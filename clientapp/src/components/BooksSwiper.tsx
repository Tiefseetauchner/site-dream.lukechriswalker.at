"use client";

import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "@/styles/retro.module.css";

interface SwiperBook {
  slug: string;
  title: string;
  order: number | null;
  cover_image: {
    url: string;
    alternativeText: string;
    width: number;
    height: number;
  };
}

export function BooksSwiper({ books }: { books: SwiperBook[]; }) {
  return (
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
      {books?.map((book, index) => {
        const bookNumber = book.order ?? index + 1;

        return (
          <SwiperSlide key={book.slug} style={{ overflow: "visible" }}>
            <Link
              href={`/books/${book.slug}`}
              className={`${styles.bookLink} group cursor-pointer`}
            >
              <div className={styles.bookCard}>
                <Image
                  src={book.cover_image.url}
                  alt={book.cover_image.alternativeText || book.title || "Book cover"}
                  width={book.cover_image.width}
                  height={book.cover_image.height}
                  className="rounded-[0.9rem]"
                />
                <div className={`${styles.bookOverlay} pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 text-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100`}>
                  <span className={`text-sm font-semibold ${styles.bookTitle}`}>{book.title}</span>
                  <span className={`text-[0.65rem] uppercase tracking-[0.22em] ${styles.bookLabel}`}>
                    View details
                  </span>
                </div>
              </div>
              <div className={`mt-3 space-y-1 text-xs ${styles.bookMeta}`}>
                <p className={`text-sm font-semibold ${styles.bookTitle}`}>{book.title}</p>
                <p className={`text-[0.65rem] uppercase tracking-[0.2em] ${styles.bookLabel}`}>
                  Book {bookNumber}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

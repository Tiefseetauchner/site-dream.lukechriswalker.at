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
              className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-200 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
            >
              <div className="book-card relative rounded-md transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)] group-focus-visible:-translate-y-1 group-focus-visible:shadow-[0_12px_28px_rgba(0,0,0,0.3)] group-active:-translate-y-0.5 group-active:shadow-[0_8px_18px_rgba(0,0,0,0.2)]">
                <Image
                  src={book.cover_image.url}
                  alt={book.cover_image.alternativeText}
                  width={book.cover_image.width}
                  height={book.cover_image.height}
                  className="rounded-md"
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-md bg-black/35 text-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="text-sm font-semibold text-slate-50">{book.title}</span>
                  <span className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-200">
                    View details
                  </span>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-200">
                <p className="text-sm font-semibold text-slate-50">{book.title}</p>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-300">
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

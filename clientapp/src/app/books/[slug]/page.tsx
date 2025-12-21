import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { PageMetadata } from "@/components/PageMetadata";
import { Panel } from "@/components/Panel";
import { getPageMetadataById, toNextMetadata } from "@/config/pageMetadata";
import { routes } from "@/utils/routes";
import { client, resolveMedia } from "@/utils/strapiClient";
import { CollectionTypeResponse } from "../../../../types/types";

type BookResponse = CollectionTypeResponse<"api::book.book">;
type BookEntity = BookResponse["data"][number];
type BookAuthor = { name?: string; slug?: string | null; };
type BookLink = { id?: number; display_name?: string | null; link: string; };
type BlocksContent = Parameters<typeof BlocksRenderer>[0] extends {
  content: infer T;
}
  ? T
  : never;

async function fetchBook(slug: string): Promise<BookEntity | null> {
  const response = (await client()
    .collection("books")
    .find({
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ["cover_image", "authors", "links"],
    })) as unknown as BookResponse;

  return response.data?.[0] ?? null;
}

const baseMetadata = toNextMetadata(getPageMetadataById("bookDetail"));

type BookPageParams = { slug: string; };

type BookPageProps = { params: Promise<BookPageParams>; };

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const book = await fetchBook((await params).slug);

  if (!book?.title) {
    return baseMetadata;
  }

  return {
    ...baseMetadata,
    title: `${book.title} | Dreams`,
  };
}

export default async function BookDetailPage({ params }: BookPageProps) {
  const book = await fetchBook((await params).slug);

  if (!book) {
    notFound();
  }

  const coverImage = book.cover_image
    ? {
      url: resolveMedia(book.cover_image.url),
      alternativeText:
        book.cover_image.alternativeText ?? book.title ?? "Book cover",
      width: book.cover_image.width ?? 600,
      height: book.cover_image.height ?? 900,
    }
    : null;

  const authors = Array.isArray(book.authors)
    ? (book.authors as BookAuthor[])
    : [];
  const links = Array.isArray(book.links)
    ? (book.links as BookLink[])
    : [];

  return (
    <>
      <PageMetadata subtitle={book.title ?? undefined} />
      <div className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
          <Panel>
            {coverImage ? (
              <Image
                src={coverImage.url}
                alt={coverImage.alternativeText}
                width={coverImage.width}
                height={coverImage.height}
                className="mx-auto w-full max-w-xs rounded-xl shadow-2xl"
                priority
              />
            ) : (
              <p className="text-sm italic text-slate-200">Cover coming soon.</p>
            )}
          </Panel>
          <Panel>
            {book.title && (
              <h2 className="text-3xl font-semibold tracking-wide text-white">
                {book.title}
              </h2>
            )}
            {authors.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold uppercase tracking-widest text-slate-200">
                  Author{authors.length > 1 ? "s" : ""}
                </h3>
                <ul className="space-y-1 text-base text-slate-100">
                  {authors.map((author) => (
                    <li key={author.slug ?? author.name}>
                      {author.slug ? (
                        <Link
                          href={routes.author(author.slug)}
                          className="underline underline-offset-4 hover:text-slate-50"
                        >
                          {author.name}
                        </Link>
                      ) : (
                        <span>{author.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {book.content_warnings && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold uppercase tracking-widest text-slate-200">
                  Content Warnings
                </h3>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-100">
                  {book.content_warnings}
                </p>
              </div>
            )}
            {links.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold uppercase tracking-widest text-slate-200">
                  Links
                </h3>
                <ul className="space-y-1 text-sm text-slate-100">
                  {links.map((link) => (
                    <li key={(link as { id?: number; }).id ?? link.link}>
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline underline-offset-4 hover:text-slate-50"
                      >
                        {link.display_name ?? link.link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Panel>
        </div>
        {book.description && (
          <Panel>
            <h3 className="text-2xl font-semibold text-white">Description</h3>
            <BlocksRenderer content={book.description as BlocksContent} />
          </Panel>
        )}
      </div>
    </>
  );
}

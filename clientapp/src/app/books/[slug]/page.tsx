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

const bookDetailMetadata = getPageMetadataById("bookDetail");
const baseMetadata = toNextMetadata(bookDetailMetadata);

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
  const actions = links
    .map((link) => {
      const label = link.display_name?.trim() || "Visit link";
      const normalized = label.toLowerCase();
      const variant = ["read online", "get the ebook", "get ebook", "ebook", "e-book"].includes(
        normalized,
      )
        ? "primary"
        : ["paperback", "license"].includes(normalized)
          ? "secondary"
          : "secondary";

      return {
        id: (link as { id?: number; }).id ?? link.link,
        label,
        href: link.link,
        variant,
      };
    })
    .sort((left, right) => {
      if (left.variant === right.variant) {
        return left.label.localeCompare(right.label);
      }
      return left.variant === "primary" ? -1 : 1;
    });

  return (
    <>
      <PageMetadata
        title={book.title ?? undefined}
        subtitle={bookDetailMetadata.subtitle}
      />
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
              <p className="text-sm italic text-stone-200">Cover coming soon.</p>
            )}
          </Panel>
          <Panel>
            {book.title && (
              <h2 className="text-3xl font-semibold tracking-wide text-white">
                {book.title}
              </h2>
            )}
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-300">
              <Link
                href={routes.books}
                className="underline underline-offset-4 hover:text-stone-50"
              >
                Dreams series
              </Link>
              {typeof book.order === "number" && book.order > 0
                ? ` · Book ${book.order}`
                : ""}
            </p>
            {authors.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold uppercase tracking-widest text-stone-200">
                  Author{authors.length > 1 ? "s" : ""}
                </h3>
                <ul className="space-y-1 text-base text-stone-100">
                  {authors.map((author) => (
                    <li key={author.slug ?? author.name}>
                      {author.slug ? (
                        <Link
                          href={routes.author(author.slug)}
                          className="underline underline-offset-4 hover:text-stone-50"
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
              <details
                className="group rounded-lg border border-white/10 bg-black/30 p-3"
              >
                <summary className="cursor-pointer text-lg font-semibold uppercase tracking-widest text-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ember-400)]">
                  Content Warnings
                </summary>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-stone-100">
                  {book.content_warnings}
                </p>
              </details>
            )}
            {actions.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold uppercase tracking-widest text-stone-200">
                  Read Yourself!
                </h3>
                <div className="flex flex-wrap gap-3">
                  {actions.map((action) => (
                    <a
                      key={action.id}
                      href={action.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={
                        action.variant === "primary"
                          ? "rounded-md bg-[color:var(--color-bone-100)] px-4 py-2 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-ink-950)] shadow-sm transition hover:bg-[color:var(--color-bone-200)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ember-400)]"
                          : "rounded-md border border-white/30 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-stone-100 transition hover:border-[color:var(--color-ember-400)] hover:text-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ember-400)]"
                      }
                    >
                      {action.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Panel>
        </div>
        {book.description && (
          <Panel>
            <h3 className="text-2xl font-semibold text-white">Description</h3>
            <div className="max-w-2xl text-base leading-relaxed text-stone-100">
              <BlocksRenderer content={book.description as BlocksContent} />
            </div>
          </Panel>
        )}
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Panel } from "@/components/Panel";
import { getPageMetadataById, toNextMetadata } from "@/config/pageMetadata";
import { routes } from "@/utils/routes";
import { client, resolveMedia } from "@/utils/strapiClient";
import { CollectionTypeResponse } from "../../../../types/types";

type AuthorResponse = CollectionTypeResponse<"api::author.author">;
type AuthorEntity = AuthorResponse["data"][number];
type AuthorBook = { id?: number; title?: string; slug?: string | null };
type AuthorMedia = {
  url?: string | null;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
};
type BlocksContent = Parameters<typeof BlocksRenderer>[0] extends {
  content: infer T;
}
  ? T
  : never;

type AuthorPageParams = { slug: string };

type AuthorPageProps = { params: AuthorPageParams };

async function fetchAuthor(slug: string): Promise<AuthorEntity | null> {
  const response = (await client()
    .collection("authors")
    .find({
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ["profile_picture", "books"],
    })) as unknown as AuthorResponse;

  return response.data?.[0] ?? null;
}

const baseMetadata = toNextMetadata(getPageMetadataById("authorDetail"));

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = await fetchAuthor(params.slug);

  if (!author?.name) {
    return baseMetadata;
  }

  return {
    ...baseMetadata,
    title: `${author.name} | Dreams`,
  };
}

export default async function AuthorDetailPage({ params }: AuthorPageProps) {
  const author = await fetchAuthor(params.slug);

  if (!author) {
    notFound();
  }

  const books = Array.isArray(author.books)
    ? (author.books as AuthorBook[])
    : [];

  const profilePicture = author.profile_picture as AuthorMedia | null | undefined;
  const profileUrl = profilePicture?.url ?? undefined;
  const profileImage = profileUrl
    ? {
        url: resolveMedia(profileUrl),
        alternativeText:
          profilePicture?.alternativeText ??
          `${author.name ?? "Author"} portrait`,
        width: profilePicture?.width ?? 320,
        height: profilePicture?.height ?? 400,
      }
    : null;

  return (
    <div className="space-y-8">
      {author.blurb && (
        <Panel>
          <p className="text-center text-lg italic text-slate-200">
            &ldquo;{author.blurb}&rdquo;
          </p>
        </Panel>
      )}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,260px)_1fr]">
        <Panel>
          <div className="space-y-6">
            {profileImage ? (
              <Image
                src={profileImage.url}
                alt={profileImage.alternativeText}
                width={profileImage.width}
                height={profileImage.height}
                className="mx-auto w-full max-w-xs rounded-xl shadow-2xl"
              />
            ) : (
              <p className="text-sm italic text-slate-200">
                Portrait coming soon.
              </p>
            )}
            {books.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold uppercase tracking-widest text-slate-200">
                  Stories
                </h3>
                <ul className="space-y-1 text-sm text-slate-100">
                  {books.map((book) => (
                    <li key={book.id ?? book.slug ?? book.title}>
                      {book.slug ? (
                        <Link
                          href={routes.book(book.slug)}
                          className="underline underline-offset-4 hover:text-slate-50"
                        >
                          {book.title}
                        </Link>
                      ) : (
                        <span>{book.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Panel>
        <Panel>
          {author.name && (
            <h2 className="text-3xl font-semibold tracking-wide text-white">
              {author.name}
            </h2>
          )}
          {author.description && (
            <BlocksRenderer content={author.description as BlocksContent} />
          )}
        </Panel>
      </div>
    </div>
  );
}

import { PageMetadata } from "@/components/PageMetadata";
import { Panel } from "@/components/Panel";
import { getPageMetadataById, toNextMetadata } from "@/config/pageMetadata";
import { routes } from "@/utils/routes";
import { client, resolveMedia } from "@/utils/strapiClient";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionTypeResponse } from "../../../../types/types";

type CharacterResponse = CollectionTypeResponse<"api::character.character">;
type CharacterEntity = CharacterResponse["data"][number];
type CharacterBook = { id?: number; title?: string; slug?: string | null; };
type CharacterMedia = {
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

type CharacterPageParams = { slug: string; };

type CharacterPageProps = { params: Promise<CharacterPageParams>; };

async function fetchCharacter(slug: string): Promise<CharacterEntity | null> {
  const response = (await client()
    .collection("characters")
    .find({
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ["profile_picture", "books"],
    })) as unknown as CharacterResponse;

  return response.data?.[0] ?? null;
}

const baseMetadata = toNextMetadata(getPageMetadataById("characterDetail"));

export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
  const character = await fetchCharacter((await params).slug);

  if (!character?.name) {
    return baseMetadata;
  }

  return {
    ...baseMetadata,
    title: `${character.name} | Dreams`,
  };
}

export default async function CharacterDetailPage({ params }: CharacterPageProps) {
  const character = await fetchCharacter((await params).slug);

  if (!character) {
    notFound();
  }

  const books = Array.isArray(character.books) ? (character.books as CharacterBook[]) : [];

  const profilePicture = character.profile_picture as CharacterMedia | null | undefined;

  const profileUrl = profilePicture?.url ?? undefined;

  const profileImage = profileUrl
    ? {
      url: resolveMedia(profileUrl),
      alternativeText: profilePicture?.alternativeText ?? `${character.name ?? "Character"} portrait`,
      width: profilePicture?.width ?? 400,
      height: profilePicture?.height ?? 600,
    }
    : null;

  const birthday = character.birthday ? new Date(character.birthday as string) : null;

  const formattedBirthday =
    birthday && !Number.isNaN(birthday.getTime()) ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(birthday) : null;

  return (
    <>
      <PageMetadata subtitle={character.name ?? undefined} description={character.blurb ?? undefined} />
      <div className="space-y-8">
        {character.blurb && (
          <Panel>
            <p className="text-center text-lg italic text-slate-200">{character.blurb}</p>
          </Panel>
        )}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr]">
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
                <p className="text-sm italic text-slate-200">Portrait coming soon.</p>
              )}
              {formattedBirthday && (
                <dl className="space-y-1 text-sm text-slate-100">
                  <dt className="font-semibold uppercase tracking-widest text-slate-200">Born</dt>
                  <dd>{formattedBirthday}</dd>
                </dl>
              )}
              {books.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold uppercase tracking-widest text-slate-200">Appears in</h3>
                  <ul className="space-y-1 text-sm text-slate-100">
                    {books.map((book) => (
                      <li key={book.id ?? book.slug ?? book.title}>
                        {book.slug ? (
                          <Link href={routes.book(book.slug)} className="underline underline-offset-4 hover:text-slate-50">
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
            {character.name && <h2 className="text-3xl font-semibold tracking-wide text-white">{character.name}</h2>}
            {character.description && <BlocksRenderer content={character.description as BlocksContent} />}
          </Panel>
        </div>
      </div>
    </>
  );
}

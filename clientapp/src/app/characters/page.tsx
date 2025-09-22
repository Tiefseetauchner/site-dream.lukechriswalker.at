import Link from "next/link";
import { Panel } from "@/components/Panel";
import { getPageMetadataById, toNextMetadata } from "@/config/pageMetadata";
import { routes } from "@/utils/routes";
import { client } from "@/utils/strapiClient";
import { CollectionTypeResponse } from "../../../types/types";

type CharacterResponse = CollectionTypeResponse<"api::character.character">;
type CharacterEntity = CharacterResponse["data"][number];

export const metadata = toNextMetadata(getPageMetadataById("characters"));

export default async function CharactersPage() {
  const response = (await client()
    .collection("characters")
    .find({
      sort: ["createdAt"],
      populate: ["profile_picture"],
    })) as unknown as CharacterResponse;

  const characters = Array.isArray(response.data)
    ? (response.data as CharacterEntity[])
    : [];

  return (
    <div className="space-y-8">
      <Panel>
        <p className="text-center text-lg italic text-slate-200">
          &ldquo;The scene isn&apos;t just kink &mdash; it&apos;s people, Sandra.&rdquo; &mdash; Christoph
        </p>
      </Panel>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {characters.map((character) => (
          <Panel key={character.slug ?? character.name}>
            <div className="space-y-3 text-center">
              {character.slug ? (
                <Link
                  href={routes.character(character.slug)}
                  className="text-2xl font-semibold tracking-wide text-white underline-offset-4 hover:underline"
                >
                  {character.name}
                </Link>
              ) : (
                <h2 className="text-2xl font-semibold tracking-wide text-white">
                  {character.name}
                </h2>
              )}
              {character.blurb && (
                <p className="text-sm italic leading-relaxed text-slate-200">
                  {character.blurb}
                </p>
              )}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

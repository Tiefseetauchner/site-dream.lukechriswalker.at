import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Panel } from "@/components/Panel";
import { getPageMetadataById, toNextMetadata } from "@/config/pageMetadata";
import { client } from "@/utils/strapiClient";
import { SingleTypeResponse } from "../../../types/types";

type ContactResponse = SingleTypeResponse<"api::contact.contact">;
type BlocksContent = Parameters<typeof BlocksRenderer>[0] extends {
  content: infer T;
}
  ? T
  : never;

export const metadata = toNextMetadata(getPageMetadataById("imprint"));

export default async function ImprintPage() {
  const response = (await client()
    .single("contact")
    .find()) as unknown as ContactResponse;

  const contact = response.data;

  return (
    <Panel>
      {contact.imprint ? (
        <BlocksRenderer content={contact.imprint as BlocksContent} />
      ) : (
        <p className="text-sm text-slate-100">
          Imprint information will be published here soon.
        </p>
      )}
    </Panel>
  );
}

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Panel } from "@/components/Panel";
import { getPageMetadataById, toNextMetadata } from "@/config/pageMetadata";
import { client } from "@/utils/strapiClient";
import { SingleTypeResponse } from "../../../types/types";

type PrivacyResponse = SingleTypeResponse<"api::privacy.privacy">;
type BlocksContent = Parameters<typeof BlocksRenderer>[0] extends {
  content: infer T;
}
  ? T
  : never;

export const metadata = toNextMetadata(getPageMetadataById("privacy"));

export default async function PrivacyPage() {
  const response = (await client()
    .single("privacy")
    .find()) as unknown as PrivacyResponse;

  const privacy = response.data;

  const updatedDate = privacy.updated ? new Date(privacy.updated as string) : null;
  const formattedUpdated =
    updatedDate && !Number.isNaN(updatedDate.getTime())
      ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(updatedDate)
      : null;

  return (
    <Panel>
      <div className="space-y-4">
        {privacy.content ? (
          <BlocksRenderer content={privacy.content as BlocksContent} />
        ) : (
          <p className="text-sm text-slate-100">
            The privacy policy will be available soon. Please check back later.
          </p>
        )}
        {formattedUpdated && (
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-200">
            Last updated: {formattedUpdated}
          </p>
        )}
      </div>
    </Panel>
  );
}

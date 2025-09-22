import { client } from "@/utils/strapiClient";
import { SingleTypeResponse } from "../../types/types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import styles from "@/styles/retro.module.scss";
import { Panel } from "@/components/Panel";

export default async function Home() {
  const data = (await client()
    .single("home-page")
    .find()) as unknown as SingleTypeResponse<"api::home-page.home-page">;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className={`${styles.panel} space-y-5 rounded-xl px-7 py-8`}>
        <BlocksRenderer content={data.data.left_text!} />
      </section>
      <Panel>
        <BlocksRenderer content={data.data.right_text!} />
      </Panel>
    </div>
  );
}


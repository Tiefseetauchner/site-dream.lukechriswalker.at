import { getPageMetadataById, toNextMetadata } from "@/config/pageMetadata";
import Link from "next/link";
import { Panel } from "@/components/Panel";
import styles from "@/styles/retro.module.css";
import { client } from "@/utils/strapiClient";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { SingleTypeResponse } from "../../types/types";
import { routes } from "@/utils/routes";
import { tt2020 } from "@/fonts/fonts";

const pageMetadata = getPageMetadataById("home");
export const metadata = toNextMetadata(pageMetadata);

export default async function Home() {
  const data = (await client()
    .single("home-page")
    .find()) as unknown as SingleTypeResponse<"api::home-page.home-page">;

  return (
    <div className="space-y-10">
      <section className={`${styles.homeHero} ${styles.panel}`}>
        <div className={styles.homeGlow} aria-hidden="true" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)]">
          <div className="space-y-6">
            <BlocksRenderer content={data.data.left_text!} />
            <div>
              <Link
                href={routes.book("dream")}
                className={`${tt2020.className} ${styles.homeCta}`}
              >
                Start with Dream
              </Link>
            </div>
          </div>
          <aside className={styles.homeAside}>
            <Panel>
              <BlocksRenderer content={data.data.right_text!} />
            </Panel>
          </aside>
        </div>
      </section>
    </div>
  );
}

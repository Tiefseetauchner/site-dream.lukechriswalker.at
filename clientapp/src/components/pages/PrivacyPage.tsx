import { Container } from "react-bootstrap";
import { usePageMeta as usePageMeta } from "../PageMetaContext";
import { useEffect, useState } from "react";
import { SingleTypeResponse } from "../../../types/types";
import { client } from "../../strapiClient";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import moment from "moment";

export function PrivacyPage() {
  const { setPageMeta } = usePageMeta();

  const [privacy, setPrivacy] =
    useState<SingleTypeResponse<"api::privacy.privacy">>();

  useEffect(() => {
    async function getPrivacy() {
      const data = (await client
        .single("privacy")
        .find()) as unknown as SingleTypeResponse<"api::privacy.privacy">;

      setPrivacy(data);
    }

    setPageMeta({
      title: "Privacy Policy",
      description: "Privacy Policy of the website.",
    });

    getPrivacy();
  }, []);

  return (
    <Container>
      {privacy?.data.content && (
        <BlocksRenderer content={privacy.data.content} />
      )}
      <p>
        <em>
          <b>
            Last updated:{" "}
            {moment(privacy?.data.updated).format("MMMM Do, YYYY")}
          </b>
        </em>
      </p>
    </Container>
  );
}

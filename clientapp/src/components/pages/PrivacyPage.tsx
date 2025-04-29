import { Container } from "react-bootstrap";
import { usePageTitle } from "../PageTitleContext";
import { useEffect, useState } from "react";
import { SingleTypeResponse } from "../../../types/types";
import { client } from "../../strapiClient";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import moment from "moment";

export function PrivacyPage() {
  const { setPageTitle } = usePageTitle();
  setPageTitle("Privacy Policy");

  const [privacy, setPrivacy] =
    useState<SingleTypeResponse<"api::privacy.privacy">>();

  useEffect(() => {
    async function getPrivacy() {
      const data = (await client
        .single("privacy")
        .find()) as unknown as SingleTypeResponse<"api::privacy.privacy">;

      setPrivacy(data);
    }

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

import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SingleTypeResponse } from "../../../types/types";
import { client } from "../../strapiClient";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { usePageTitle } from "../PageTitleContext";

export function ImprintPage() {
  const { setPageTitle } = usePageTitle();
  setPageTitle("Imprint");

  const [contact, setContact] =
    useState<SingleTypeResponse<"api::contact.contact">>();

  useEffect(() => {
    async function getContact() {
      const data = (await client
        .single("contact")
        .find()) as unknown as SingleTypeResponse<"api::contact.contact">;

      setContact(data);
    }

    getContact();
  }, []);

  return (
    <Container>
      {contact?.data.imprint && (
        <BlocksRenderer content={contact.data.imprint} />
      )}
    </Container>
  );
}

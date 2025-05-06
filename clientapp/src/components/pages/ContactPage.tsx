import { useEffect, useState } from "react";
import { usePageTitle } from "../PageTitleContext";
import { client } from "../../strapiClient";
import { SingleTypeResponse } from "../../../types/types";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export function ContactPage() {
  const { setPageTitle } = usePageTitle();
  setPageTitle("Contact");

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

  const sendContactForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    await fetch("/admin/api/ezforms/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData: formJson }),
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          {contact?.data.text && <BlocksRenderer content={contact.data.text} />}
        </Col>
        <Col>
          <div
            style={{
              width: "100%",
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "rgb(58, 14, 23)",
            }}
          >
            <h2>Contact Data</h2>
            <hr style={{ borderColor: "white" }} />
            <ul>
              <li>
                E-Mail:{" "}
                <a
                  href={`mailto:${contact?.data.contact_email}`}
                  target="_blank"
                >
                  {contact?.data.contact_email}
                </a>
              </li>
            </ul>
            <Form onSubmit={sendContactForm}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} name="message" required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Send
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

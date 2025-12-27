import { ContactForm } from "@/components/ContactForm";
import { Panel } from "@/components/Panel";
import { getPageMetadataById, toNextMetadata } from "@/config/pageMetadata";
import { client } from "@/utils/strapiClient";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { SingleTypeResponse } from "../../../types/types";

type ContactResponse = SingleTypeResponse<"api::contact.contact">;
type ContactLinks = { id?: number; display_name?: string | null; link: string };
type BlocksContent = Parameters<typeof BlocksRenderer>[0] extends {
  content: infer T;
}
  ? T
  : never;

export const metadata = toNextMetadata(getPageMetadataById("contact"));

export default async function ContactPage() {
  const response = (await client().single("contact").find()) as unknown as ContactResponse;

  const contact = response.data;
  const links = Array.isArray(contact.links) ? (contact.links as ContactLinks[]) : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <Panel>{contact.text && <BlocksRenderer content={contact.text as BlocksContent} />}</Panel>
      <Panel>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">Contact Data</h2>
            <p className="text-sm text-stone-100">For all inquiries, reach out via the channels below or send a direct message through the form.</p>
            <ul className="space-y-1 text-sm text-stone-100">
              {contact.contact_email && (
                <li>
                  <span className="font-semibold uppercase tracking-widest text-stone-200">Email:</span>{" "}
                  <a href={`mailto:${contact.contact_email}`} className="underline underline-offset-4 hover:text-stone-50">
                    {contact.contact_email}
                  </a>
                </li>
              )}
              {links.map((link) => (
                <li key={link.id ?? link.link}>
                  <a href={link.link} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4 hover:text-stone-50">
                    {link.display_name ?? link.link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </Panel>
    </div>
  );
}

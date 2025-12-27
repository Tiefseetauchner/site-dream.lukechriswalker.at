import { BooksSwiper } from "@/components/BooksSwiper";
import { getPageMetadataById, toNextMetadata } from "@/config/pageMetadata";
import { client, resolveMedia } from "@/utils/strapiClient";
import { CollectionTypeResponse } from "../../../types/types";

const pageMetadata = getPageMetadataById("books");
export const metadata = toNextMetadata(pageMetadata);

export default async function BooksPage() {
  const data = (await client()
    .collection("books")
    .find({
      status: "published",
      populate: ["cover_image", "authors", "links"],
      sort: ["order"],
    })) as unknown as CollectionTypeResponse<"api::book.book">;

  const books = data.data.map((book) => ({
    slug: book.slug!,
    title: book.title ?? "Untitled",
    order: typeof book.order === "number" ? book.order : null,
    cover_image: {
      url: resolveMedia(book.cover_image.url),
      alternativeText: book.cover_image.alternativeText ?? book.title ?? "Book cover",
      width: book.cover_image.width,
      height: book.cover_image.height,
    },
  }));

  return (
    <div className="space-y-6">
      <p className="text-sm text-stone-200">Select a book to view details and reading options.</p>
      <BooksSwiper books={books} />
    </div>
  );
}

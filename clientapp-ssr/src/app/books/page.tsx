import { CollectionTypeResponse } from "../../../types/types";
import { BooksSwiper } from "@/components/BooksSwiper";
import { client, resolveMedia } from "@/utils/strapiClient";

export default async function BooksPage() {
  const data = (await client()
    .collection("books")
    .find({
      status: "published",
      populate: ["cover_image", "authors"],
      sort: ["order"],
    })) as unknown as CollectionTypeResponse<"api::book.book">;

  const books = data.data.map((book) => ({
    slug: book.slug!,
    cover_image: {
      url: resolveMedia(book.cover_image.url),
      alternativeText: book.cover_image.alternativeText,
      width: book.cover_image.width,
      height: book.cover_image.height,
    },
  }));

  return (
    <>
      <BooksSwiper books={books} />
    </>
  );
}

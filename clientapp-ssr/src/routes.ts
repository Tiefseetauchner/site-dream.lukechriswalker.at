export const routes = {
  home: "/",
  books: "/books",
  book: (id: string) => `/books/${id}`,
  characters: "/characters",
  character: (id: string) => `/characters/${id}`,
  mainAuthor: "/authors/lena-tauchner",
  author: (id: string) => `/authors/${id}`,
  contact: "/contact",
  imprint: "/imprint",
  license: "/license",
  privacy: "/privacy",
};

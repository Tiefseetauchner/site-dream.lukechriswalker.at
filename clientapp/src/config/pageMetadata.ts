import { routes } from "@/utils/routes";
import type { Metadata } from "next";

export type PageMetadataId =
  | "home"
  | "books"
  | "bookDetail"
  | "license"
  | "characters"
  | "characterDetail"
  | "authorDetail"
  | "contact"
  | "imprint"
  | "privacy";

export type PageMetadataEntry = {
  id: PageMetadataId;
  path: string;
  title: string;
  subtitle: string;
  description?: string;
  dynamic?: boolean;
};

export type FallbackMetadataEntry = {
  id: "fallback";
  path: string;
  title: string;
  subtitle: string;
  description?: string;
};

export type PageMetadata = PageMetadataEntry | FallbackMetadataEntry;

const SITE_TITLE = "Dreams";

const pageMetadataEntries: PageMetadataEntry[] = [
  {
    id: "home",
    path: routes.home,
    title: SITE_TITLE,
    subtitle: "Not all dreams are gentle. Some cut deep. Some teach you who you are.",
    description: "Journey into the Dream universe, where every story reshapes what you know about yourself.",
  },
  {
    id: "books",
    path: routes.books,
    title: "Books",
    subtitle: "Discover the works that chart the Dream universe.",
    description: "Browse the Dream series catalogue and explore every published adventure.",
  },
  {
    id: "bookDetail",
    path: routes.books,
    title: "Book Detail",
    subtitle: "Explore this story from the Dream universe.",
    description: "Background, authorship, and publication details for an individual Dream book.",
    dynamic: true,
  },
  {
    id: "license",
    path: routes.license,
    title: "License",
    subtitle: "Understand how the Dream universe content is licensed.",
    description: "Rights, licensing, and attribution guidance for material across the Dream universe.",
  },
  {
    id: "characters",
    path: routes.characters,
    title: "Characters",
    subtitle: "Meet the people who bring the Dream universe to life.",
    description: "Explore the key figures from the Dreams series and discover their relationships and arcs.",
  },
  {
    id: "characterDetail",
    path: "/characters",
    title: "Character Profile",
    subtitle: "Dive into the history and relationships of this Dream character.",
    description: "Biographical notes, appearances, and background for an individual Dreams character.",
    dynamic: true,
  },
  {
    id: "authorDetail",
    path: "/authors",
    title: "Author",
    subtitle: "Learn more about the minds behind the Dream universe.",
    description: "Author biographies, featured works, and insights from the Dream universe.",
    dynamic: true,
  },
  {
    id: "contact",
    path: routes.contact,
    title: "Contact",
    subtitle: "Get in touch with the Dream universe team.",
    description: "Reach out for rights inquiries, questions, or collaboration opportunities.",
  },
  {
    id: "imprint",
    path: routes.imprint,
    title: "Imprint",
    subtitle: "Legal details for the Dream universe website.",
    description: "Publisher contact information and statutory disclosures for Dream universe.",
  },
  {
    id: "privacy",
    path: routes.privacy,
    title: "Privacy Policy",
    subtitle: "How we handle data on the Dream universe website.",
    description: "Understand how personal data is collected, processed, and protected when you browse Dreams.",
  },
];

const fallbackEntry: FallbackMetadataEntry = {
  id: "fallback",
  path: "*",
  title: SITE_TITLE,
  subtitle: "Stories from the Dream universe.",
  description: "Dreams by Lena Tauchner.",
};

const entriesById = pageMetadataEntries.reduce<Record<PageMetadataId, PageMetadataEntry>>(
  (accumulator, entry) => {
    accumulator[entry.id] = entry;
    return accumulator;
  },
  {} as Record<PageMetadataId, PageMetadataEntry>
);

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function getPageMetadataById(id: PageMetadataId): PageMetadataEntry {
  return entriesById[id];
}

export function resolvePageMetadata(pathname: string): PageMetadataEntry | FallbackMetadataEntry {
  const normalized = normalizePathname(pathname);
  const match = pageMetadataEntries.find((entry) => {
    if (entry.dynamic) {
      if (normalized === entry.path) {
        return false;
      }
      return normalized.startsWith(`${entry.path}/`);
    }
    return normalized === entry.path;
  });

  return match ?? fallbackEntry;
}

export function toNextMetadata(entry: PageMetadataEntry | FallbackMetadataEntry): Metadata {
  const title = entry.id === "home" || entry.id === "fallback" ? entry.title : `${entry.title} | ${SITE_TITLE}`;

  return {
    title,
    description: entry.description ?? entry.subtitle,
  };
}

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { PostMeta, Post } from "@/types/post";

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function readMDXFile(locale: string, slug: string): Promise<Post> {
  const filePath = path.join(CONTENT_DIR, "posts", locale, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: {
      ...data,
      slug,
      readingTime: data.readingTime ?? Math.ceil(readingTime(content).minutes),
    } as PostMeta,
    content,
  };
}

export async function readAllMDXFiles(locale: string): Promise<PostMeta[]> {
  const dir = path.join(CONTENT_DIR, "posts", locale);
  try {
    const files = await fs.readdir(dir);
    const posts = await Promise.all(
      files
        .filter((f) => f.endsWith(".mdx"))
        .map(async (f) => {
          const slug = f.replace(".mdx", "");
          const { meta } = await readMDXFile(locale, slug);
          return meta;
        }),
    );
    return posts;
  } catch {
    return [];
  }
}

export async function readAuthorFile(slug: string, locale = "es") {
  const dir = path.join(CONTENT_DIR, "authors");

  const indexPath = path.join(dir, "index.json");
  const index: Record<string, Record<string, string>> = JSON.parse(
    await fs.readFile(indexPath, "utf-8"),
  );

  const entry = Object.values(index).find((locales) =>
    Object.values(locales).includes(slug),
  );

  const localizedSlug = entry?.[locale] ?? slug;

  const filePath = path.join(dir, `${localizedSlug}.${locale}.json`);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function readAllAuthors() {
  const dir = path.join(CONTENT_DIR, "authors");
  try {
    const files = await fs.readdir(dir);
    return Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (f) => {
          const raw = await fs.readFile(path.join(dir, f), "utf-8");
          return JSON.parse(raw);
        }),
    );
  } catch {
    return [];
  }
}

export async function readCategoryFile(slug: string) {
  const filePath = path.join(CONTENT_DIR, "categories", `${slug}.json`);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function readAllCategories() {
  const dir = path.join(CONTENT_DIR, "categories");
  try {
    const files = await fs.readdir(dir);
    return Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (f) => {
          const raw = await fs.readFile(path.join(dir, f), "utf-8");
          return JSON.parse(raw);
        }),
    );
  } catch {
    return [];
  }
}

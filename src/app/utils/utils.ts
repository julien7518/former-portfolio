import fs from "fs";
import path from "path";
import matter from "gray-matter";

type ProjectsMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  images: string[];
  previewLimit?: number;
  link?: string;
  techs: string[];
};

import { notFound } from 'next/navigation';

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
    if (!fs.existsSync(filePath)) {
        notFound();
    }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: ProjectsMetadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    images: data.images || [],
    link: data.link || "",
    previewLimit: data.previewLimit || 1,
    techs: data.techs || [],
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getProjects() {
  const postsDir = path.join(process.cwd(), "src", "app", "work", "projects");
  return getMDXData(postsDir);
}
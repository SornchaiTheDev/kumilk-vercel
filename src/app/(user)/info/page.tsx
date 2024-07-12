import path from "path";
import { remark } from "remark";
import html from "remark-html";
import { promises } from "fs";
import matter from "gray-matter";

export default async function InfoPage() {
  const fullPath = path.join("src/app/(user)/info/", `content.md`);
  const fileContents = await promises.readFile(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return (
    <div className="prose mt-5" dangerouslySetInnerHTML={{ __html: contentHtml }} />
  );
}

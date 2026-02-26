import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic"; // ეს ახალი
export const revalidate = 0; // არასდროს დააკეშოს

export default async function sitemap() {
  const filePath = path.join(process.cwd(), "sitemap.json");
  const json = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(json);
  return data;
}

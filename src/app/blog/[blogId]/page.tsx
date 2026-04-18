import ClientBlogPage from "./ClientBlogPage";

export default async function Page({ params }: { params: { blogId: string } }) {
  let oneBlogData = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/front/info/blog/${params.blogId}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    oneBlogData = await res.json();
  } catch (err) {
    oneBlogData = null;
  }

  return <ClientBlogPage oneBlogData={oneBlogData} />;
}

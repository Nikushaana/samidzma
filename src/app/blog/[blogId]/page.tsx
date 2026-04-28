import ClientBlogPage from "./ClientBlogPage";
import type { Metadata } from "next";

async function getBlog(blogId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/front/info/blog/${blogId}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) return null;

    const data = await res.json();

    return data;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}): Promise<Metadata> {
  const data = await getBlog(params.blogId);

  if (!data) {
    return {
      title: "ბლოგი",
      description: "ბლოგის გვერდი",
    };
  }

  const title = data.meta_name || data.name || "ბლოგი";
  const description =
    data.meta_description || data.description || "ნახე ვრცლად ეს ბლოგი";

  const image = data.main_img
    ? `${process.env.NEXT_PUBLIC_API_URL}/${data.main_img}`
    : "/images/mainLogo.png";

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page({ params }: { params: { blogId: string } }) {
  const oneBlogData = await getBlog(params.blogId);

  return <ClientBlogPage oneBlogData={oneBlogData} />;
}

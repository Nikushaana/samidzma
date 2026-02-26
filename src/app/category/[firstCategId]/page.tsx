import FirstCategDetailsClient from "./FirstCategDetailsClient";
import { Metadata } from "next";

type Props = {
  params: { firstCategId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const firstId = params.firstCategId.split("_").pop();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/firstLevelCategories`,
    { cache: "no-store" }
  );

  const categories = await res.json();
  const category = categories.data.find((categ: any) => categ.IdProdSaxeoba == firstId);
  
  const title = category.meta_title || category.ProdSaxeobaName;
  const description = category.meta_description || "";
  const image = category.image
    ? category?.image
    : "/public/images/mainLogo.png";
  
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

export default function Page({ params }: Props) {
  return <FirstCategDetailsClient params={params} />;
}

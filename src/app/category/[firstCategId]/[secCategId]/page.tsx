import { Metadata } from "next";
import SecondCategDetailsClient from "./SecondCategDetailsClient";

type Props = {
  params: { firstCategId: string; secCategId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const firstId = params.firstCategId.split("_").pop();
  const secId = params.secCategId.split("_").pop();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/secondLevelCategories?IdProdSaxeoba=${firstId}`,
    { cache: "no-store" }
  );

  const categories = await res.json();
  const category = categories.data.find(
    (categ: any) => categ.IdProdTypeGroup == secId
  );

  const title = category.meta_title || category.ProdTypeGroupName;
  const description = category.meta_description || "";
  const image = category.image
    ? `${process.env.NEXT_PUBLIC_API_URL}/${category?.image}`
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
  return <SecondCategDetailsClient params={params} />;
}

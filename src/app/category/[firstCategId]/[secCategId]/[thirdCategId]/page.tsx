import React from "react";
import CategoryComponent from "@/app/components/categoryContent/categoryComponent";
import { Metadata } from "next";
import CategoryComponentTest from "@/app/components/categoryContent/categoryComponentTest";

type Props = {
  params: { secCategId: string; thirdCategId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const secId = params.secCategId.split("_").pop();
  const thirdId = params.thirdCategId.split("_").pop();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/threeLevelCategories?IdProdTypeGroup=${secId}`,
    { cache: "no-store" },
  );

  const categories = await res.json();

  const category = categories.data.find(
    (categ: any) => categ.IdProdType == thirdId,
  );

  const title = category.meta_title || category.ProdTypeName;
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

export default function Page({ params }: { params: { thirdCategId: string } }) {
  return (
    // <CategoryComponent />
    <CategoryComponentTest />
  );
}

import ProductDetailsClient from "./ProductDetailsClient";
import { Metadata } from "next";

type Props = {
  params: { productId: string; variationId: string };
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const id = params.productId.split("_").pop();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/front/ourProduct/${id}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) throw new Error("Product fetch failed");

    const oneProduct = await res.json();

    const title =
      oneProduct?.product?.MomcProdCode ||
      oneProduct?.product?.ProductName ||
      "სამიძმა";
    const description =
      oneProduct?.product?.Description2 ||
      oneProduct?.product?.Description5 ||
      title ||
      "სამიძმა";
    const keywords = oneProduct?.product?.Description3 || title || "სამიძმა";
    const imageAlt = oneProduct?.product?.ProductNameRUS || title || "სამიძმა";
    const image =
      `${process.env.NEXT_PUBLIC_API_URL}/${oneProduct?.product?.main_image}` ||
      "/public/images/mainLogo.png";

    return {
      metadataBase: new URL("https://samidzma.ge"),
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        images: [{ url: image, alt: imageAlt }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch (err: any) {
    return {
      title: "Product Not Found",
      description: "Product not found",
      openGraph: { title: "Product Not Found" },
      twitter: { title: "Product Not Found" },
    };
  }
}

export default function PageWrapper({ params }: Props) {
  return <ProductDetailsClient params={params} />;
}

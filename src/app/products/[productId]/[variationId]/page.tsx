import { Metadata } from "next";
import ProductDetailsClient from "../ProductDetailsClient";

type Props = {
  params: { productId: string; variationId: string };
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const id = params.productId.split("_").pop();
    const vid = params.variationId.split("_").pop();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/front/ourProduct/${id}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) throw new Error("Product fetch failed");

    const oneProduct = await res.json();

    const vOneProduct =
      vid &&
      oneProduct?.product?.product_menus?.length == 0 &&
      oneProduct?.variation?.find((item: any) => item.ProdCode == vid);

    const title =
      vOneProduct?.MomcProdCode || vOneProduct?.ProductName || "სამიძმა";
    const description =
      vOneProduct?.Description2 ||
      vOneProduct?.Description5 ||
      title ||
      "სამიძმა";
    const keywords = vOneProduct?.Description3 || title || "სამიძმა";
    const imageAlt = vOneProduct?.ProductNameRUS || title || "სამიძმა";
    const image =
      `${process.env.NEXT_PUBLIC_API_URL}/${vOneProduct?.main_image}` ||
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

import ProductDetailsClient from "./ProductDetailsClient";
import { Metadata } from "next";

type Props = {
  params: { productId: string };
  searchParams: { variation?: string };
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  try {
    const id = params.productId.split("_").pop();
    const variation = searchParams?.variation;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/front/ourProduct/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Product fetch failed");

    const oneProduct = await res.json();

    const lastVersionData =
      variation && oneProduct?.product?.product_menus?.length == 0
        ? oneProduct?.variation?.find((item: any) => item.ProdCode == variation)
        : oneProduct?.product;

    const title =
      lastVersionData?.MomProdCode || lastVersionData?.ProductName || "სამიძმა";
    const description =
      lastVersionData?.Description2 ||
      lastVersionData?.Description5 ||
      title ||
      "სამიძმა";
    const keywords = lastVersionData?.Description3 || title || "სამიძმა";
    const imageAlt = lastVersionData?.ProductNameRUS || title || "სამიძმა";
    const image = lastVersionData?.main_image || "/public/images/mainLogo.png";

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

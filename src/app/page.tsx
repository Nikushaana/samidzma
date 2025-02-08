import TopBanner from "./components/mainPage/TopBanner";
import EverySlider from "./components/sliders/EverySlider";
import {
  getServerSideBlogs,
  getServerSideRecomendedProducts,
} from "../../dataFetchs/getServerSide/getData";
import Image from "next/image";
import BlogsBackgroundDesigns from "./components/decorationColumns/BlogsBackgroundDesigns";

export default async function Home() {
  const blogData = await getServerSideBlogs();
  const recomendedProductsData = await getServerSideRecomendedProducts();

  return (
    <div className="pb-[100px] flex flex-col items-center gap-y-[90px] max-lg:gap-y-[51px]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[25px] flex flex-col gap-y-[90px] max-lg:gap-y-[50px] relative">
        <TopBanner />
        <EverySlider
          data={recomendedProductsData.data}
          title={
            <h1 className="text-[28px] max-sm:text-[22px]">
              პოპულარული პროდუქტები
            </h1>
          }
          card="SmallProdCard"
          slidesPerView={8}
          spaceBetween={18}
        />
        <div className="rounded-[12px] bg-[#EAEDEE] p-[30px] max-lg:p-0 flex flex-col gap-y-[20px] relative">
          <BlogsBackgroundDesigns/>
          <EverySlider
            data={blogData.data}
            title={<h1 className="text-[28px] max-sm:text-[22px]">ბლოგი</h1>}
            card="BlogCard"
            slidesPerView={4}
            spaceBetween={20}
            showButtons={true}
          />
        </div>
      </div>

      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-0">
        <div className="rounded-[12px] max-lg:rounded-none bg-myBlack p-[30px] max-lg:px-[90px] max-sm:px-[25px]">
          <EverySlider
            data={[1, 2, 3, 4, 5, 6]}
            title={
              <h1 className="text-[28px] max-sm:text-[22px] text-white">
                რეკომენდებული ნაკრებები
              </h1>
            }
            card="KitCard"
            slidesPerView={4}
            spaceBetween={17}
            showButtons={true}
          />
        </div>
      </div>

      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[25px] flex flex-col gap-y-[90px] max-lg:gap-y-[51px]">
        <div className="flex flex-col gap-y-[24px]">
          <EverySlider
            data={[1, 2, 3]}
            card="buySameCardThree"
            slidesPerView={3}
            spaceBetween={24}
            showButtons={true}
          />
          <div className="max-sm:hidden">
            <EverySlider
              data={[1, 2, 3]}
              card="buySameCardFour"
              slidesPerView={2}
              spaceBetween={24}
              showButtons={true}
            />
          </div>
        </div>
        <EverySlider
          data={recomendedProductsData.data}
          title={
            <h1 className="text-[28px] max-sm:text-[22px]">
              პოპულარული პროდუქტები
            </h1>
          }
          card="SmallProdCard"
          slidesPerView={8}
          spaceBetween={18}
        />
      </div>
    </div>
  );
}

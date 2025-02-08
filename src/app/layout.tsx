import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SharingStatesContext from "../../dataFetchs/sharedStates";
import AlertCust from "./components/AlertCust";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserAxiosContext from "../../dataFetchs/UserAxios";
import WishListContext from "../../dataFetchs/wishListContext";
import CartContext from "../../dataFetchs/cartContext";
import PromoCodeInfoPopUp from "./components/popUps/admin/promoCodeInfoPopUp/PromoCodeInfoPopUp";
import BurgerMenu from "./components/burgerMenu/BurgerMenu";
import ProductReviewPopUp from "./components/popUps/productReviewPopUp";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import BackgroundDesigns from "./components/decorationColumns/BackgroundDesigns";
import CategoriesPopUp from "./components/popUps/CategoriesPopUp";
import ProductCardsPopUp from "./components/popUps/ProductCardsPopUp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "სამი ძმა - საიტი მუშაობს ბეტა რეჟიმში",
  description: "სამი ძმა - საიტი მუშაობს ბეტა რეჟიმში",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOAuthProvider clientId="596940978385-hg3bk4s56khamjvgmg1qnr7vdfi78omq.apps.googleusercontent.com">
          <SharingStatesContext>
            <UserAxiosContext>
              <WishListContext>
                <CartContext>
                  <div className="bg-[#f7f7f7] max-lg:bg-[#eaedee] overflow-hidden relative pt-[30px]">
                    <div className="fixed top-0 w-[100vw] bg-myGreen text-white z-[10] h-[30px] pointer-events-none">
                      <Marquee>საიტი მუშაობს ბეტა რეჟიმში</Marquee>
                    </div>
                    <BackgroundDesigns />
                    <Header />
                    {children}
                    <Footer />
                    <BurgerMenu />
                    <CategoriesPopUp />
                    <ProductCardsPopUp />
                    <PromoCodeInfoPopUp />
                    <ProductReviewPopUp />
                    <AlertCust />
                  </div>
                </CartContext>
              </WishListContext>
            </UserAxiosContext>
          </SharingStatesContext>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

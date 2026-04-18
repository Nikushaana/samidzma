import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import "react-quill/dist/quill.snow.css";
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
import BackgroundDesigns from "./components/decorationColumns/BackgroundDesigns";
import ProductCardsPopUp from "./components/popUps/ProductCardsPopUp";
import CreateCartPopUp from "./components/popUps/CreateCartPopUp";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ReactQueryProvider from "./providers";
import TestProductCardsPopUp from "./components/popUps/testProductCardsPopUp";

export const metadata: Metadata = {
  title: "სამი ძმა",
  description: "სამი ძმა",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-MG52GXVW');`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MG52GXVW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <ReactQueryProvider>
          <GoogleOAuthProvider clientId="596940978385-hg3bk4s56khamjvgmg1qnr7vdfi78omq.apps.googleusercontent.com">
            <SharingStatesContext>
              <UserAxiosContext>
                <WishListContext>
                  <CartContext>
                      <div className="bg-[#f7f7f7] max-lg:bg-[#eaedee] relative">
                        <div className="absolute inset-0 overflow-hidden z-0">
                          <BackgroundDesigns />
                        </div>
                        <Header />
                        {children}
                        <Footer />
                        <BurgerMenu />
                        <CreateCartPopUp />
                        {/* <ProductCardsPopUp /> */}
                        <TestProductCardsPopUp />
                        <PromoCodeInfoPopUp />
                        <ProductReviewPopUp />
                        <AlertCust />
                        <ScrollToTopButton />
                      </div>
                  </CartContext>
                </WishListContext>
              </UserAxiosContext>
            </SharingStatesContext>
          </GoogleOAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

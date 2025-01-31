"use client";

import useScreenWidth from "@/app/components/ScreenWidth";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

export const ContextForSharingStates = createContext<any>(null);

const SharingStatesContext = ({ children }: any) => {
  const screenWidth = useScreenWidth();
  const pathname = usePathname();

  const [SearchPopUp, setSearchPopUp] = useState(false);
  const [openRecomendedPopUp, setOpenRecomendedPopUp] = useState<number | null>(
    null
  );
  const [productReviewPopUp, setProductReviewPopUp] = useState<string>("");
  const [openPromoCodeInfoPopUp, setOpenPromoCodeInfoPopUp] = useState<
    number | null
  >(null);

  const [alertShow, setAlertShow] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertText, setAlertText] = useState("");

  useEffect(() => {
    if (alertShow) {
      const timer = setTimeout(() => {
        setAlertShow(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [alertShow]);

  const [burgerMenu, setBurgerMenu] = useState<boolean>(false);
  const [userMenu, setUserMenu] = useState<boolean>(true);

  useEffect(() => {
    if (burgerMenu) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [burgerMenu]);

  useEffect(() => {
    setBurgerMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (screenWidth > 992) {
      setUserMenu(true);
    } else {
      setUserMenu(false);
    }
  }, [screenWidth]);

  const [allVacancyRender, setAllVacancyRender] = useState<any>();
  const [allVacancyCvRender, setAllVacancyCvRender] = useState<any>();
  const [allFAQRender, setAllFAQRender] = useState<any>();

  const [allBlogRender, setAllBlogRender] = useState<any>();
  const [allBannerRender, setAllBannerRender] = useState<any>();

  const [allMessagesRender, setAllMessagesRender] = useState<any>();
  const [allProdGiftsRender, setAllProdGiftsRender] = useState<any>();
  const [allPromoCodesRender, setAllPromoCodesRender] = useState<any>();

  const [allCommentsRender, setAllCommentsRender] = useState<any>();
  const [allUserCommentsRender, setAllUserCommentsRender] = useState<any>();
  const [renderProdReview, setRenderProdReview] = useState<any>();
  const [allAdminUserOrderRender, setAllAdminUserOrderRender] = useState<any>();
  const [allAdminUsersRender, setAllAdminUsersRender] = useState<any>();

  // datas

  const [status, setStatus] = useState([
    {
      id: 0,
      name: "დაბლოკილი",
    },
    {
      id: 1,
      name: "აქტიური",
    },
  ]);

  const [seen, setSeen] = useState([
    {
      id: 0,
      name: "განხილული",
    },
    {
      id: 1,
      name: "განსახილველი",
    },
  ]);

  const [menuRoutes, setMenuRoutes] = useState([
    {
      id: 1,
      name: "პროდუქცია",
      link: "products",
    },
    {
      id: 2,
      name: "ნაკრებები",
      link: "catalog-for-set",
    },
    {
      id: 3,
      name: "ბლოგი",
      link: "blog",
    },
    {
      id: 4,
      name: "ვაკანსიები",
      link: "careers",
    },
    {
      id: 5,
      name: "FAQ",
      link: "faq",
    },
  ]);

  // context datas
  const [sizes, setSizes] = useState([]);
  const [gender, setGender] = useState([]);
  const [style, setStyle] = useState([]);
  const [color, setColor] = useState([]);

  const fetchAllData = async () => {
    try {
      const [sizesResponse, genderResponse, styleResponse, colorResponse] =
        await Promise.all([
          axiosUser.get("front/size"),
          axiosUser.get("front/sqesi"),
          axiosUser.get("front/style"),
          axiosUser.get("front/color"),
        ]);

      setSizes(sizesResponse.data);
      setGender(genderResponse.data);
      setStyle(styleResponse.data);
      setColor(colorResponse.data);
    } catch (error) {}
  };

  return (
    <ContextForSharingStates.Provider
      value={{
        SearchPopUp,
        setSearchPopUp,
        openRecomendedPopUp,
        setOpenRecomendedPopUp,
        openPromoCodeInfoPopUp,
        setOpenPromoCodeInfoPopUp,
        productReviewPopUp,
        setProductReviewPopUp,

        userMenu,
        setUserMenu,
        burgerMenu,
        setBurgerMenu,

        allVacancyRender,
        setAllVacancyRender,
        allVacancyCvRender,
        setAllVacancyCvRender,
        allFAQRender,
        setAllFAQRender,
        allBlogRender,
        setAllBlogRender,
        allMessagesRender,
        setAllMessagesRender,
        allProdGiftsRender,
        setAllProdGiftsRender,
        allPromoCodesRender,
        setAllPromoCodesRender,
        allBannerRender,
        setAllBannerRender,
        allCommentsRender,
        setAllCommentsRender,
        allUserCommentsRender,
        setAllUserCommentsRender,
        renderProdReview,
        setRenderProdReview,
        allAdminUserOrderRender,
        setAllAdminUserOrderRender,
        allAdminUsersRender,
        setAllAdminUsersRender,

        alertShow,
        setAlertShow,
        alertStatus,
        setAlertStatus,
        alertText,
        setAlertText,

        status,
        seen,
        menuRoutes,

        sizes,
        gender,
        style,
        color,
        fetchAllData,
      }}
    >
      {children}
    </ContextForSharingStates.Provider>
  );
};

export default SharingStatesContext;

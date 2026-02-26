"use client";

import useScreenWidth from "@/app/components/ScreenWidth";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";
import { CartAxiosContext } from "./cartContext";
import { UserContext } from "./UserAxios";

export const ContextForSharingStates = createContext<any>(null);

const SharingStatesContext = ({ children }: any) => {
  const screenWidth = useScreenWidth();
  const pathname = usePathname();

  const [createCartPopUp, setCreateCartPopUp] = useState({
    popUpStatus: false,
    changeMethod: false,
    prodCode: null,
    cartProdQuant: null,
    complect: null,
    IntegerQuantity: false,
    announcement: false,
    min_value: null,
  });

  const [filterValues, setFilterValues] = useState<any>({
    key: "",

    FeriCode: [],
    FormaCode: [],
    StyleCode: [],
    SqesiCode: [],
    SizeCode: [],
    IdAttribute1: [],
    IdAttribute2: [],
    IdAttribute3: [],
    IdAttribute4: [],
    IdAttribute5: [],
    IdAttribute6: [],

    minPrice: 0,
    maxPrice: 10000,
    sale: 0,
  });
  const [currentPage, setCurrentPage] = useState<any>(0);

  const [openProductCardPopUp, setOpenProductCardPopUp] = useState<
    number | null
  >(null);
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
    if (burgerMenu || createCartPopUp.prodCode) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [burgerMenu, createCartPopUp.prodCode]);

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
  const [allSiteInfoRender, setAllSiteInfoRender] = useState<any>();
  const [allPromoCodesRender, setAllPromoCodesRender] = useState<any>();

  const [allCommentsRender, setAllCommentsRender] = useState<any>();
  const [renderProdReview, setRenderProdReview] = useState<any>();
  const [allAdminUserOrderRender, setAllAdminUserOrderRender] = useState<any>();
  const [allAdminUsersRender, setAllAdminUsersRender] = useState<any>();

  const slugify = (text: string) => {
    return text
      .toLowerCase() // optional: make lowercase
      .trim() // remove leading/trailing spaces
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/[^\w\-ა-ჰ.]/g, ""); // remove any invalid chars, keep Georgian letters
  };

  const [pathnameItems, setPathnameItems] = useState<any>([]);

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

  const [branchStatus, setBranchStatus] = useState([
    {
      id: 0,
      name: "დაბლოკილი",
    },
    {
      id: 1,
      name: "გამოიყენება მარაგებისთვის",
    },
    {
      id: 2,
      name: "საიტზე ჩანს უბრალოდ",
    },
  ]);

  const [order_status, setOrder_Status] = useState([
    {
      id: 1,
      name: "მიმდინარეობს შესრულება",
      nameEng: "PROCESSING",
    },
    {
      id: 2,
      name: "მიბრუნებულია",
      nameEng: "RETURNED",
    },
    {
      id: 3,
      name: "შესრულებულია",
      nameEng: "SUBMITTED",
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

  const [siteInfoPages, setSiteInfoPages] = useState([
    {
      id: 1,
      name: "წესები და პირობები",
    },
    {
      id: 2,
      name: "მიტანის სერვისი",
    },
    {
      id: 3,
      name: "დაბრუნების პოლიტიკა",
    },
    {
      id: 4,
      name: "კონფიდენციალურობის პოლიტიკა",
    },
    {
      id: 5,
      name: "მომხმარებლის თანხმობა",
    },
    {
      id: 6,
      name: "ვაკანსიები",
    },
    {
      id: 7,
      name: "ჩვენ შესახებ (ვინ ვართ ჩვენ)",
    },
    {
      id: 8,
      name: "ჩვენ შესახებ (ჩვენი ისტორია)",
    },
    {
      id: 9,
      name: "ჩვენ შესახებ (ჩვენი გუნდი)",
    },
    {
      id: 10,
      name: "ჩვენ შესახებ (ჩვენი ხედვა)",
    },
    {
      id: 11,
      name: "ჩვენი ფილიალები",
    },
  ]);
  
  const [footerInfoPages, setFooterInfoPages] = useState([
    {
      id: 1,
      name: "წესები და პირობები",
      url: "rules-and-conditions",
    },
    {
      id: 2,
      name: "მიტანის სერვისი",
      url: "delivery-service",
    },
    {
      id: 3,
      name: "დაბრუნების პოლიტიკა",
      url: "return-policy",
    },
    {
      id: 4,
      name: "კონფიდენციალურობის პოლიტიკა",
      url: "privacy-policy",
    },
  ]);

  const [menuRoutes, setMenuRoutes] = useState([
    {
      id: 1,
      name: "ყველა კატეგორია",
      link: "category",
    },
    {
      id: 2,
      name: "ფასდაკლებულები",
      link: "sale",
    },
    {
      id: 3,
      name: "ნაკრებები",
      link: "category-for-set",
    },
    {
      id: 4,
      name: "ბლოგი",
      link: "blog",
    },
    {
      id: 5,
      name: "ვაკანსიები",
      link: "careers",
    },
  ]);

  return (
    <ContextForSharingStates.Provider
      value={{
        createCartPopUp,
        setCreateCartPopUp,

        filterValues,
        setFilterValues,
        currentPage,
        setCurrentPage,

        openProductCardPopUp,
        setOpenProductCardPopUp,
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
        allSiteInfoRender,
        setAllSiteInfoRender,
        allPromoCodesRender,
        setAllPromoCodesRender,
        allBannerRender,
        setAllBannerRender,
        allCommentsRender,
        setAllCommentsRender,
        renderProdReview,
        setRenderProdReview,
        allAdminUserOrderRender,
        setAllAdminUserOrderRender,
        allAdminUsersRender,
        setAllAdminUsersRender,

        slugify,
        pathnameItems,
        setPathnameItems,

        alertShow,
        setAlertShow,
        alertStatus,
        setAlertStatus,
        alertText,
        setAlertText,

        status,
        branchStatus,
        order_status,
        seen,
        menuRoutes,
        siteInfoPages,
        footerInfoPages
      }}
    >
      {children}
    </ContextForSharingStates.Provider>
  );
};

export default SharingStatesContext;

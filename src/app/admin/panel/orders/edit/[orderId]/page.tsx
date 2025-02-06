"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../dataFetchs/AxiosToken";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import TextEditor from "@/app/components/Inputs/TextEditor";

export default function Page({ params }: { params: { orderId: string } }) {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    status,
    setAllAdminUserOrderRender,
  } = useContext(ContextForSharingStates);
  const [loaderEditAdminUserOrder, setLoaderEditAdminUserOrder] =
    useState<boolean>(true);

  const [oneAdminUserOrderValues, setOneAdminUserOrderValues] = useState<any>(
    {}
  );
  const [editAdminUserOrderValues, setEditAdminUserOrderValues] = useState({});

  useEffect(() => {
    setLoaderEditAdminUserOrder(true);
    axiosAdmin
      .get(`admin/userOrder/orders/${params.orderId}`)
      .then((res) => {
        setOneAdminUserOrderValues(res.data);
        setLoaderEditAdminUserOrder(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.orderId]);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      HandleEditAdminUserOrder();
    }
  };

  const HandleEditAdminUserOrder = () => {
    setLoaderEditAdminUserOrder(true);
    // if (editBlogValues.blogs_category_id && editBlogValues.name) {
    //   axiosAdmin
    //     .post(`admin/Blog/${params.blogId}`, {
    //       blogs_category_id: allBlogCategData.find(
    //         (item: any) => item.name === editBlogValues.blogs_category_id
    //       ).id,
    //       name: editBlogValues.name,
    //       name_eng: editBlogValues.name_eng,
    //       name_rus: editBlogValues.name_rus,
    //       description: editBlogValues.description,
    //       description_eng: editBlogValues.description_eng,
    //       description_rus: editBlogValues.description_rus,
    //       description2: editBlogValues.description2,
    //       description2_eng: editBlogValues.description2_eng,
    //       description2_rus: editBlogValues.description2_rus,
    //       meta_name: editBlogValues.meta_name,
    //       meta_description: editBlogValues.meta_description,
    //       main_img: editBlogValues.main_img,
    //       // sort: editBlogValues.sort,
    //       status: status.find(
    //         (item: any) => item.name === editBlogValues.status
    //       )?.id,
    //     })
    //     .then((res) => {
    //       router.push("/admin/panel/Blog");
    //       setAlertShow(true);
    //       setAlertStatus(true);
    //       setAlertText("წარმატებით რედაქტირდა");
    //       setAllBlogRender(res);
    //     })
    //     .catch((err) => {
    //       setLoaderEditBlog(false);
    //       setAlertShow(true);
    //       setAlertStatus(false);
    //       setAlertText("ვერ რედაქტირდა!");
    //     })
    //     .finally(() => {});
    // } else {
    //   setLoaderEditBlog(false);
    // }
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderEditAdminUserOrder && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">შეკვეთის რედაქტირება</h1>

      <div className="w-full">
        <p>{oneAdminUserOrderValues?.bank_card_cvv}</p>

        <p>{oneAdminUserOrderValues?.bank_card_expiration_date}</p>

        <p>{oneAdminUserOrderValues?.bank_card_number}</p>

        <p>{oneAdminUserOrderValues?.bank_transaction_id}</p>

        <p>{oneAdminUserOrderValues?.comment}</p>

        <p>{oneAdminUserOrderValues?.createdAt}</p>

        <p>{oneAdminUserOrderValues?.delivery_address}</p>

        <p>{oneAdminUserOrderValues?.delivery_address_lat}</p>

        <p>{oneAdminUserOrderValues?.delivery_address_lng}</p>

        <p>{oneAdminUserOrderValues?.delivery_building_number}</p>

        <p>{oneAdminUserOrderValues?.delivery_day}</p>

        <p>{oneAdminUserOrderValues?.delivery_house_door_number}</p>

        <p>{oneAdminUserOrderValues?.delivery_price}</p>

        <p>{oneAdminUserOrderValues?.delivery_street}</p>

        <p>{oneAdminUserOrderValues?.delivery_time_from}</p>

        <p>{oneAdminUserOrderValues?.delivery_time_to}</p>

        <p>{oneAdminUserOrderValues?.description}</p>

        <p>{oneAdminUserOrderValues?.driver_code}</p>

        <p>{oneAdminUserOrderValues?.email}</p>

        <p>{oneAdminUserOrderValues?.finally_price}</p>

        <p>{oneAdminUserOrderValues?.invoice_number}</p>

        <p>{oneAdminUserOrderValues?.is_delivery}</p>

        <p>{oneAdminUserOrderValues?.lastName}</p>

        <p>{oneAdminUserOrderValues?.name}</p>

        <p>{oneAdminUserOrderValues?.order_status}</p>

        <p>{oneAdminUserOrderValues?.pay_method}</p>

        <p>{oneAdminUserOrderValues?.pay_status}</p>

        <p>{oneAdminUserOrderValues?.phone}</p>

        <p>{oneAdminUserOrderValues?.price}</p>

        <p>{oneAdminUserOrderValues?.promo_code_id}</p>

        <p>{oneAdminUserOrderValues?.refund_amount}</p>

        <p>{oneAdminUserOrderValues?.saved_in_system}</p>

        <p>{oneAdminUserOrderValues?.status}</p>

        <p>{oneAdminUserOrderValues?.store_code}</p>

        <p>{oneAdminUserOrderValues?.system_id}</p>

        <p>{oneAdminUserOrderValues?.user_id}</p>
      </div>

      <div className="w-[200px]">
        <GreenButton
          name="რედაქტირება"
          action={HandleEditAdminUserOrder}
          loader={loaderEditAdminUserOrder}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}

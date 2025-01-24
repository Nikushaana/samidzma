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

  const [oneAdminUserOrderValues, setOneAdminUserOrderValues] = useState({});
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
      {/* <div className="grid grid-cols-3 gap-[20px] w-full"> */}
      {/* <DropDown1value
          title="ბლოგის კატეგორია"
          data={allBlogCategData}
          name="blogs_category_id"
          firstValue={
            allBlogCategData.find(
              (item: any) => item.id === oneBlogValues.blogs_category_id
            )?.name
          }
          setAllValues={setEditBlogValues}
          error={false}
        />
        <Input1
          title="მეტა სახელი"
          name="meta_name"
          type="text"
          firstValue={oneBlogValues.meta_name}
          setAllValues={setEditBlogValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="მეტა აღწერა"
          name="meta_description"
          type="text"
          firstValue={oneBlogValues.meta_name}
          setAllValues={setEditBlogValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
      </div>
      <hr className="h-[1px] w-full" />
      <div className="grid grid-cols-1 gap-[20px] w-full">
        <Input1
          title="სათაური"
          name="name"
          type="text"
          firstValue={oneBlogValues.meta_name}
          setAllValues={setEditBlogValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <TextArea1
          title="მოკლე აღწერა"
          name="description"
          firstValue={oneBlogValues.description}
          setAllValues={setEditBlogValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <TextEditor
          title="ბლოგი"
          name="description2"
          firstValue={oneBlogValues.description2}
          setAllValues={setEditBlogValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <hr className="h-[1px] w-full" />
        <Input1
          title="სათაური EN"
          name="name_eng"
          type="text"
          firstValue={oneBlogValues.name_eng}
          setAllValues={setEditBlogValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <TextArea1
          title="მოკლე აღწერა"
          name="description_eng"
          firstValue={oneBlogValues.description_eng}
          setAllValues={setEditBlogValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <TextEditor
          title="ბლოგი EN"
          name="description2_eng"
          firstValue={oneBlogValues.description2_eng}
          setAllValues={setEditBlogValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <hr className="h-[1px] w-full" />
        <Input1
          title="სათაური Рус"
          name="name_rus"
          type="text"
          firstValue={oneBlogValues.name_rus}
          setAllValues={setEditBlogValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <TextArea1
          title="მოკლე აღწერა"
          name="description_rus"
          firstValue={oneBlogValues.description_rus}
          setAllValues={setEditBlogValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <TextEditor
          title="ბლოგი Рус"
          name="description2_rus"
          firstValue={oneBlogValues.description2_rus}
          setAllValues={setEditBlogValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
      </div>
      <hr className="h-[1px] w-full" />
      <div className="grid grid-cols-3 gap-[20px] w-full">
        <Input1
          title="სორტირება (მიუთითეთ სასურველი რიცხვი)"
          digit={true}
          name="sort"
          type="text"
          firstValue={oneBlogValues.sort}
          setAllValues={setEditBlogValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <DropDown1value
          title="სტატუსი"
          data={status}
          name="status"
          firstValue={
            status.find((item: any) => item.id === oneBlogValues.status)?.name
          }
          setAllValues={setEditBlogValues}
          error={false}
        />
      </div> */}
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

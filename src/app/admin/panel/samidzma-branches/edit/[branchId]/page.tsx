"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../dataFetchs/AxiosToken";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import useSamidzmaBranches from "../../../../../../../dataFetchs/samidzmaBranchesContext";
import dynamic from "next/dynamic";

const NewMap = dynamic(() => import("@/app/components/map/newMap"), {
  ssr: false,
});

export default function Page({ params }: { params: { branchId: string } }) {
  const router = useRouter();

  const { setAlertShow, setAlertStatus, setAlertText, branchStatus } =
    useContext(ContextForSharingStates);

  const { fetchSamidzmaBranches } = useSamidzmaBranches();

  const [loaderEditBranch, setLoaderEditBranch] = useState<boolean>(true);

  const [oneBranchValues, setOneBranchValues] = useState<SamidzmaBranch>();
  const [editBranchValues, setEditBranchValues] = useState({
    status: "",
    latlng: [0, 0],
  });

  useEffect(() => {
    setLoaderEditBranch(true);
    axiosAdmin
      .get(`admin/branch/${params.branchId}`)
      .then((res) => {
        setOneBranchValues(res.data);
        setLoaderEditBranch(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.branchId]);

  const HandleEditBranch = () => {
    setLoaderEditBranch(true);

    axiosAdmin
      .post(`admin/branch/${params.branchId}`, {
        status: branchStatus.find(
          (item: any) => item.name === editBranchValues.status,
        )?.id,
        Latitude: editBranchValues.latlng[0],
        Longitude: editBranchValues.latlng[1],
      })
      .then((res) => {
        router.push("/admin/panel/samidzma-branches");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით რედაქტირდა");
        fetchSamidzmaBranches();
      })
      .catch((err) => {
        setLoaderEditBranch(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ რედაქტირდა!");
      })
      .finally(() => {});
  };

  

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderEditBranch && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">ფილიალის რედაქტირება</h1>
      <p className="w-full text-[14px]">{oneBranchValues?.StoreName}</p>
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-[20px] w-full">
        <DropDown1value
          title="სტატუსი"
          data={branchStatus}
          name="status"
          firstValue={
            branchStatus.find(
              (item: any) => item.id === oneBranchValues?.status,
            )?.name
          }
          setAllValues={setEditBranchValues}
          error={false}
        />
      </div>

      <div className="h-[350px] w-full">
        <NewMap
          activeArea={[
            Number(oneBranchValues?.Latitude),
            Number(oneBranchValues?.Longitude),
          ]}
          name="latlng"
          setAllValues={setEditBranchValues}
          chooseTbilisiArea={false}
        />
      </div>
      {/* <Map
        activeArea={{
          lat: Number(oneBranchValues?.Latitude),
          lng: Number(oneBranchValues?.Longitude),
        }}
        name="latlng"
        setAllValues={setEditBranchValues}
        chooseTbilisiArea={false}
      /> */}
      <div className="w-[200px]">
        <GreenButton
          name="რედაქტირება"
          action={HandleEditBranch}
          loader={loaderEditBranch}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}

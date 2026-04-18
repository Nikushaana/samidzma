import { axiosUser } from "../../dataFetchs/AxiosToken";

export const fetchChildCategories = async ({
  pathname,
  key,
  passedCategories,
}: {
  pathname: string;
  key?: string | null;
  passedCategories?: any[];
}) => {
  const level = pathname.split("/").length;

  if (level === 2) {
    const res = await axiosUser.get(
      `ourfilter/getProdTypeGroupsKey?key=${key}`
    );
    return res.data;
  }

  const groupId = pathname.split("/")[3]?.split("_").pop();

  const res = await axiosUser.get(
    `ourFilter/getProdTypesKey?key=${key}&IdProdGroupType=${groupId}`
  );

  return res.data;
};
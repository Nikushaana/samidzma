import { axiosUser } from "../../dataFetchs/AxiosToken";

export const fetchFirstLevelCategories = async () => {
  const res = await axiosUser.get("front/firstLevelCategories");
  return res.data.data;
};
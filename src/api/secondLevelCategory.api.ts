import { axiosUser } from "../../dataFetchs/AxiosToken";

export const fetchSecondLevelCategories = async (id: string) => {
  const res = await axiosUser.get(`front/secondLevelCategories?IdProdSaxeoba=${id}`);
  return res.data.data;
};
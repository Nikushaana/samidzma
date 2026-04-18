import { axiosUser } from "../../dataFetchs/AxiosToken";

export const fetchThirdLevelCategories = async (id: string) => {
  const res = await axiosUser.get(`front/threeLevelCategories?IdProdTypeGroup=${id}`);
  return res.data.data;
};
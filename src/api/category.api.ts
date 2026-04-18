import { axiosUser } from "../../dataFetchs/AxiosToken";

export const fetchCategories = async () => {
  const res = await axiosUser.get("front/categories");
  return res.data.data;
};
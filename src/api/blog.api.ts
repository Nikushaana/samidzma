import { axiosUser } from "../../dataFetchs/AxiosToken";

export const fetchBlogs = async () => {
  const res = await axiosUser.get("front/info/blog");
  return res.data.data;
};
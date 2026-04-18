import { axiosUser } from "../../dataFetchs/AxiosToken";

export const fetchDeliveryInfo = async () => {
  const res = await axiosUser.get("front/info/deliveryInfo");
  return res.data;
};
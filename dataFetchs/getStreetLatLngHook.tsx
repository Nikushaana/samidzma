"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useGetStreetLatLng = ({ streetName }: any) => {
  const [streetLatLng, setStreetLatLng] = useState<any>();

  useEffect(() => {
    if (streetName) {
      axiosUser
        .get(`front/geoLoc?name=${streetName}`)
        .then((res) => {
          setStreetLatLng(res.data.data);
        })
        .catch((err) => {})
        .finally(() => {});
    }
  }, [streetName]);

  return streetLatLng;
};

export default useGetStreetLatLng;

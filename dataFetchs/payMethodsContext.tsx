"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const usePaymethods = () => {
  const [PaymethodsLoader, setPaymethodsLoader] = useState<boolean>(true);

  const [payMethodData, setPayMethodData] = useState<PayMethod[]>([]);

  const fetchPaymethods = () => {
    setPaymethodsLoader(true);
    axiosUser
      .get("front/info/paymentMethod")
      .then((res) => {
        setPayMethodData([
          {
            id: 1,
            pay_method: "CASH",
            name: "ნაღდი ანგარიშსწორება",
            status: res.data.CASH,
            account: ""
          },
          {
            id: 2,
            pay_method: "BOG",
            name: "ბარათით გადახდა",
            status: res.data.BOG,
            account: ""
          },
          {
            id: 3,
            pay_method: "UNIPAY",
            name: "UNIPAY",
            status: res.data.UNIPAY,
            account: ""
          },
          {
            id: 4,
            pay_method: "BOG_ACCOUNT",
            name: "გადარიცხვა BOG-ით",
            status: res.data.TRANSFER,
            account: res.data.BOG_ACCOUNT
          },
          {
            id: 5,
            pay_method: "TBC_ACCOUNT",
            name: "გადარიცხვა TBC-ით",
            status: res.data.TRANSFER,
            account: res.data.TBC_ACCOUNT
          },
        ]);
        setPaymethodsLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  };

  useEffect(() => {
    fetchPaymethods();
  }, []);

  return {
    payMethodData,
    PaymethodsLoader,
    fetchPaymethods,
  };
};

export default usePaymethods;

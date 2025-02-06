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
          },
          {
            id: 2,
            pay_method: "BOG",
            name: "ბარათით გადახდა",
            status: res.data.BOG,
          },
          // {
          //   id: 3,
          //   pay_method: "TBC",
          //   name: "თიბისი ბანკი",
          //   status: res.data.TBC,
          // },
          {
            id: 3,
            pay_method: "UNIPAY",
            name: "UNIPAY",
            status: res.data.UNIPAY,
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

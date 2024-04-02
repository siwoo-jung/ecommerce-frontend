"use client";

import OrderList from "@/components/OrderList";
import axios from "axios";
import AuthContext from "@/components/AuthContext";
import { useContext, useEffect, useState } from "react";
import { orderType } from "@/types/Type";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { user, accessToken, cartInfo } = useContext(AuthContext);
  const [orderInfo, setOrderInfo] = useState<orderType>({
    "": {
      cartInfo: {},
      date: "",
      grandTotal: 0,
    },
  });

  useEffect(() => {
    getOrders();
  }, [user]);

  useEffect(() => {
    router.refresh();
  }, [cartInfo]);

  const getOrders = async () => {
    try {
      const authURI: any = process.env.NEXT_PUBLIC_ORDERS;
      const response = await axios.post(
        authURI,
        {
          email: user.email,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setOrderInfo(response.data.body.orders);
    } catch (e) {
      console.log(e);
    }
  };

  delete orderInfo[""];

  return (
    <div className="flex flex-col gap-3 min-sm:min-w-[600px]">
      {Object.keys(orderInfo).map((order, index) => (
        <OrderList
          orderInfo={orderInfo}
          order={order}
          key={index}
          email={user.email}
        />
      ))}
    </div>
  );
};

export default Page;

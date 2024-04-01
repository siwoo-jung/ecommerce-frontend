"use client";

import { useContext, useEffect, useState } from "react";
import AuthContext from "@/components/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReviewStar from "@/components/ReviewStar";
import { UserProfile } from "@/types/Type";
import axios from "axios";

const Page = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const initialUserInfo: UserProfile = {
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    isAdmin: false,
    password: null,
    reviews: {
      "": {
        date: "",
        description: "",
        firstName: "",
        lastName: "",
        rating: 0,
        title: "",
        imageURL: "",
        fullName: "",
        prodName: "",
      },
    },
    uuid: null,
  };

  const [userInfo, setUserInfo] = useState(initialUserInfo);

  async function fetchData() {
    console.log("email is...", user.email);
    const prodURI: any = process.env.NEXT_PUBLIC_LOGIN + `?email=${user.email}`;
    return await axios.get(prodURI, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  }

  useEffect(() => {
    const getProductData = async () => {
      const response = await fetchData();
      console.log("response is...", response);
      setUserInfo(response.data.body.Item);
      console.log("userInfo is...", userInfo);
    };
    getProductData();
  }, [user]);

  return (
    <div className="gap-4 flex flex-col">
      {Object.keys(userInfo.reviews).map((prodId, index) => (
        <div key={index} className="border rounded-xl shadow-xl p-3">
          <Link
            href={`/products/${userInfo.reviews[prodId].prodName}`}
            className="flex flex-row gap-4 items-center"
          >
            <img
              src={userInfo.reviews[prodId].imageURL}
              height={100}
              width={100}
            ></img>
            <div className="text-lg font-bold max-sm:text-sm">
              {userInfo.reviews[prodId].fullName}
            </div>
          </Link>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex text-gray-400 text-sm">
              {userInfo.reviews[prodId].date}
            </div>
            <div className="rating flex flex-col gap-2">
              <div className="flex flex-row">
                <ReviewStar
                  avgRating={userInfo.reviews[prodId].rating}
                  numReview={null}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-lg rounded-sm pl-1 font-bold">
                {userInfo.reviews[prodId].title}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm rounded-sm pl-1">
                {userInfo.reviews[prodId].description}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;

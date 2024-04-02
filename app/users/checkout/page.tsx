"use client";
import AuthContext from "@/components/AuthContext";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Link from "next/link";
import { FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const { cartInfo, isLoggedIn, checkoutCart } = useContext(AuthContext);
  const [grandTotal, setGrandTotal] = useState(0);
  const router = useRouter();
  useEffect(() => {
    console.log(cartInfo);
    Object.keys(cartInfo).map((prodId, _) => {
      setGrandTotal((prev) => prev + cartInfo[prodId].subtotal);
    });
  }, [cartInfo]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const authURI: any = process.env.NEXT_PUBLIC_CHECKOUT;
    console.log("Sending POST request...");
    try {
      setIsSubmitting(true);
      await checkoutCart(grandTotal);
      setIsSubmitting(false);
      setTimeout(() => {
        router.push("/users/orders");
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  console.log("grand total", grandTotal);
  return (
    <div className="flex flex-col shadow-2xl p-8 rounded-l items-center gap-4 min-sm:min-w-[600px]">
      <div className="flex w-full text-xl font-bold">Order Summary</div>
      <div className="flex flex-rows items-center w-full gap-1 justify-between">
        <div className="flex w-2/3 text-center">Product</div>
        <div className=" text-center flex w-1/6 justify-center max-sm:hidden">
          Quantity
        </div>
        <div className=" text-center w-1/6 justify-center hidden max-sm:flex">
          Qty
        </div>
        <div className=" text-center max-sm:hidden">Subtotal</div>
        <div className=" text-center max-sm:flex hidden">Sub</div>
      </div>
      <div className="flex flex-col w-full items-center gap-4">
        {isLoggedIn &&
          Object.keys(cartInfo).map((prodId, index) => (
            <div
              key={index}
              className="flex flex-row items-center gap-1 w-full justify-between"
            >
              <Link
                href={`/products/${prodId}`}
                className="flex flex-row w-2/3 gap-2"
              >
                <img
                  src={cartInfo[prodId].imageURL}
                  className="flex relative object-scale-down h-30 w-20 justify-center"
                ></img>
                <div className="flex flex-col text-sm justify-between">
                  <div className="max-sm:text-xs">
                    {cartInfo[prodId].fullName}
                  </div>
                  <div className="text-gray-400 max-sm:text-sm">
                    ${cartInfo[prodId].unitPrice}
                  </div>
                </div>
              </Link>
              <div className="flex w-1/6 text-sm justify-center">
                x {cartInfo[prodId].quantity}
              </div>
              <div className="flex text-sm">$ {cartInfo[prodId].subtotal}</div>
            </div>
          ))}
      </div>
      <div className="flex w-full justify-end font-mono text-lg">
        Total: ${grandTotal}
      </div>

      <form
        className="flex flex-col mt-10 w-full group"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="flex w-full text-xl font-bold mb-2">
          Billing Details
        </div>
        <div className="flex flex-col text-lg gap-1">
          <label htmlFor="cnumber" className="text-sm">
            Card number
          </label>
          <input
            type="text"
            name="cardnumber"
            placeholder="1111-2222-3333-4444"
            id="cnumber"
            className="text-sm rounded-sm border border-gray-400 pl-1"
          ></input>
        </div>
        <div className="flex flex-col text-lg gap-1">
          <label htmlFor="cname" className="text-sm">
            Name on card
          </label>
          <input
            type="text"
            name="cardname"
            placeholder="name"
            id="cname"
            className="text-sm rounded-sm border border-gray-400 pl-1"
          ></input>
        </div>

        <div className="flex flex-row gap-3 w-full">
          <div className="flex flex-col w-4/5 text-lg gap-1">
            <label htmlFor="expmonth" className="text-sm">
              Expiration date (MM/YY)
            </label>
            <input
              type="text"
              name="expmonth"
              placeholder="10/25"
              id="expmonth"
              className="text-sm rounded-sm border border-gray-400 pl-1"
            ></input>
          </div>
          <div className="flex flex-col text-lg gap-1 w-1/5">
            <label htmlFor="cvc" className="text-sm">
              CVC
            </label>
            <input
              type="text"
              name="cvc"
              placeholder="000"
              id="cvc"
              className="text-sm rounded-sm border border-gray-400 pl-1"
            ></input>
          </div>
        </div>
        <button
          type="submit"
          disabled={grandTotal == 0 || isSubmitting}
          className="flex btn_auth h-[50px] w-[150px] mt-10 items-center justify-center disabled:bg-blue-200"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Page;

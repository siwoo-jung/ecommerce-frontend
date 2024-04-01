"use client";

import AuthContext from "@/components/AuthContext";
import QuantityButton from "@/components/QuantityButton";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { user, isLoggedIn, cartInfo, saveCart } = useContext(AuthContext);
  const [grandTotal, setGrandTotal] = useState(0);

  const handleQuantityChange = (prodId: string, newQuantity: number) => {
    console.log(prodId, newQuantity);
    cartInfo[prodId].quantity = newQuantity;
    cartInfo[prodId].subtotal = parseFloat(
      (newQuantity * cartInfo[prodId].unitPrice).toFixed(2)
    );
  };

  const toggleGrandTotal = (val: number) =>
    setGrandTotal((prev) => parseFloat((prev + val).toFixed(2)));

  const [isSaveCartSubmitting, setIsSaveCartSubmiting] = useState(false);

  const handleSaveCartSubmit = async () => {
    try {
      console.log("deducting quantities...");
      setIsSaveCartSubmiting(true);
      await saveCart(cartInfo);
    } catch (e) {
      alert("Try again");
    } finally {
      setIsSaveCartSubmiting(false);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col rounded-xl shadow-2xl p-8 rounded-l items-center gap-4 min-sm:min-w-[550px] max-sm:p-0 max-sm:w-full">
      <p className="flex flex-start w-full text-blue-800 font-bold mb-3 ">
        Your Carts
      </p>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row min-w-[600px] max-lg:min-w-[600px] max-sm:min-w-[300px]">
          <p className="font-bold  max-lg:text-sm max-sm:text-xs w-1/2  ">
            Product
          </p>
          <p className="font-bold max-lg:text-sm max-sm:text-xs  w-1/12">
            Price
          </p>
          <div className="flex flex-row justify-between  w-5/12 max-sm:flex-col max-sm:items-center">
            <p className="font-bold max-lg:text-sm max-sm:text-xs">Quantity</p>
            <p className="font-bold max-lg:text-sm max-sm:text-xs">Subtotal</p>
            <p></p>
          </div>
        </div>

        {isLoggedIn &&
          Object.keys(cartInfo).map((prodId, index) => (
            <div className="flex flex-row rounded-xl shadow-lg p-1 border" key={index}>
              <div
                key={index}
                className="flex flex-row items-center gap-3 w-1/2 justify-between px-1"
              >
                <Link
                  href={`/products/${prodId}`}
                  className="flex flex-row gap-2 max-lg:flex-col"
                >
                  <img
                    src={cartInfo[prodId].imageURL}
                    className="flex relative object-scale-down h-[100px] justify-center max-lg:h-[50px]"
                  ></img>
                  <div className="flex text-sm items-center max-lg:text-xs">
                    {cartInfo[prodId].fullName}
                  </div>
                </Link>
              </div>
              <div key={index} className="w-1/12 flex items-center">
                {isSaveCartSubmitting ? (
                  <div className="flex w-[80px] text-sm max-sm:text-xs text-gray-400">
                    $ {cartInfo[prodId].unitPrice}
                  </div>
                ) : (
                  <div className="flex w-[80px] max-sm:text-xs text-sm">
                    $ {cartInfo[prodId].unitPrice}
                  </div>
                )}
              </div>
              <div className="flex  w-5/12">
                <QuantityButton
                  index={index}
                  prodId={prodId}
                  cartInfo={cartInfo}
                  handleQuantityChange={handleQuantityChange}
                  toggleGrandTotal={toggleGrandTotal}
                  handleSaveCartSubmit={handleSaveCartSubmit}
                  isSaveCartSubmitting={isSaveCartSubmitting}
                />
              </div>
            </div>
          ))}
      </div>

      <div className="flex flex-row w-full gap-10 mt-10 justify-between items-center">
        <div className="flex flex-col  gap-1 w-1/2 p-2">
          <p className="flex font-bold text-lg">Summary</p>
          <div className="flex flex-row gap-3 justify-between ">
            <p className="italic text-base">Delivery Charge</p>
            <p>$0</p>
          </div>
          <div className="flex flex-row gap-3 justify-between ">
            <p className="italic">Grand Total</p>
            <p>${grandTotal}</p>
          </div>
        </div>
        <button
          type="button"
          disabled={grandTotal == 0}
          onClick={() => router.push("/users/checkout")}
          className="flex btn_auth h-[50px] items-center disabled:bg-blue-200"
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
}

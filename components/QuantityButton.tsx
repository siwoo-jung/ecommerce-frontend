import { cartsType } from "@/types/Type";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  index: number;
  prodId: string;
  cartInfo: cartsType;
  handleQuantityChange: (prodId: string, quantity: number) => void;
  toggleGrandTotal: (val: number) => void;
  handleSaveCartSubmit: () => void;
  isSaveCartSubmitting: boolean;
}

const QuantityButton: React.FC<Props> = ({
  index,
  prodId,
  cartInfo,
  handleQuantityChange,
  toggleGrandTotal,
  handleSaveCartSubmit,
  isSaveCartSubmitting,
}) => {
  const router = useRouter();
  const initialQuantity = cartInfo[prodId].quantity;
  const [currentQuantity, setCurrentQuantity] = useState(initialQuantity);

  useEffect(() => {
    toggleGrandTotal(
      parseFloat((initialQuantity * cartInfo[prodId].unitPrice).toFixed(2))
    );
  }, []);

  const updateQuantity = (value: string) => {
    const newQuantity =
      Number.isNaN(parseInt(value)) || parseInt(value) < 1
        ? 1
        : parseInt(value);
    handleQuantityChange(prodId, newQuantity);
    toggleGrandTotal(
      parseFloat(
        (cartInfo[prodId].unitPrice * (newQuantity - currentQuantity)).toFixed(
          2
        )
      )
    );
    setCurrentQuantity(newQuantity);
    handleSaveCartSubmit();
  };

  return (
    <div className="flex flex-row items-center gap-3 w-full justify-between max-sm:flex-col max-sm:justify-around">
      <div className="flex flex-row">
        <button
          type="button"
          className="w-[30px] h-[30px] font-bold border flex justify-center items-center border-blue-300 disabled:text-gray-400 max-sm:w-[20px] max-sm:h-[20px]"
          onClick={() => {
            const newQuantity = currentQuantity <= 1 ? 1 : currentQuantity - 1;
            updateQuantity(newQuantity.toString());
            handleSaveCartSubmit();
          }}
          disabled={currentQuantity == 1 || isSaveCartSubmitting}
        >
          -
        </button>
        {isSaveCartSubmitting ? (
          <p
            key={index}
            className="flex items-center justify-center border w-[30px] h-[30px] max-sm:w-[20px] max-sm:h-[20px] max-sm:text-xs border-blue-300 text-sm text-gray-400"
            style={{ textAlign: "center" }}
          >
            {currentQuantity}
          </p>
        ) : (
          <p
            key={index}
            className="flex items-center justify-center border w-[30px] h-[30px] max-sm:w-[20px] max-sm:h-[20px] border-blue-300 text-sm"
            style={{ textAlign: "center" }}
          >
            {currentQuantity}
          </p>
        )}

        <button
          type="button"
          className="w-[30px] h-[30px] max-sm:w-[20px] max-sm:h-[20px] flex justify-center items-center text-white font-bold bg-blue-700 disabled:bg-blue-200"
          onClick={() => {
            const newQuantity = currentQuantity + 1;
            updateQuantity(newQuantity.toString());
            handleSaveCartSubmit();
          }}
          disabled={isSaveCartSubmitting}
        >
          +
        </button>
      </div>
      {isSaveCartSubmitting ? (
        <p className="text-sm text-gray-400 max-sm:text-xs">
          $ {cartInfo[prodId].subtotal}
        </p>
      ) : (
        <p className="text-sm max-sm:text-xs">$ {cartInfo[prodId].subtotal}</p>
      )}

      <button
        type="button"
        onClick={() => {
          toggleGrandTotal(
            parseFloat(
              (
                -1 *
                cartInfo[prodId].quantity *
                cartInfo[prodId].unitPrice
              ).toFixed(2)
            )
          );
          delete cartInfo[prodId];
          handleSaveCartSubmit();
          router.refresh();
        }}
        disabled={isSaveCartSubmitting}
      >
        {isSaveCartSubmitting ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 8L36 12H16V20H20V80C20 82.0889 20.7653 84.2184 22.2734 85.7266C23.7816 87.2347 25.9111 88 28 88H68C70.0889 88 72.2184 87.2347 73.7266 85.7266C75.2347 84.2184 76 82.0889 76 80V20H80V12H60L56 8H40ZM28 20H68V80H28V20ZM36 28V72H44V28H36ZM52 28V72H60V28H52Z"
              fill="gray"
            />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 8L36 12H16V20H20V80C20 82.0889 20.7653 84.2184 22.2734 85.7266C23.7816 87.2347 25.9111 88 28 88H68C70.0889 88 72.2184 87.2347 73.7266 85.7266C75.2347 84.2184 76 82.0889 76 80V20H80V12H60L56 8H40ZM28 20H68V80H28V20ZM36 28V72H44V28H36ZM52 28V72H60V28H52Z"
              fill="black"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default QuantityButton;

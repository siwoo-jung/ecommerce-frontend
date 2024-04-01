import { orderType } from "@/types/Type";
import Link from "next/link";

interface Props {
  orderInfo: orderType;
  order: string;
  email: string;
}

const OrderList: React.FC<Props> = ({ orderInfo, order, email }) => {
  return (
    <div className="border shadow-xl rounded-xl p-3 w-full">
      <div className="text-lg font-mono">
        Order ID:{" "}
        <span className="font-bold">
          {email.split("@")[0]}-#{order}
        </span>
      </div>
      <div className="flex flex-row justify-between">
        <div className="text-sm">{orderInfo[order].date}</div>
        <div className="font-bold">
          <span className="text-sm font-normal">Total: </span>$
          {orderInfo[order].grandTotal}
        </div>
      </div>

      {Object.keys(orderInfo[order].cartInfo).map((item, index) => (
        <div
          key={index}
          className="flex flex-row justify-between items-center w-full gap-1"
        >
          <Link
            href={`/products/${item}`}
            className="flex flex-row w-1/2 gap-3 max-sm:flex-col max-sm:items-center"
          >
            <div className="max-sm:h-[70px] max-sm:w-[80px]">
              <img
                src={orderInfo[order].cartInfo[item].imageURL}
                height={80}
                width={70}
              ></img>
            </div>

            <div className="flex flex-col justify-around">
              <div className="max-sm:text-xs">
                {orderInfo[order].cartInfo[item].fullName}
              </div>
              <div className="text-gray-400 text-xs">
                ${orderInfo[order].cartInfo[item].unitPrice}
              </div>
            </div>
          </Link>
          <div className="flex max-sm:text-xs">
            x{orderInfo[order].cartInfo[item].quantity}
          </div>
          <div className="flex max-sm:text-xs">
            ${orderInfo[order].cartInfo[item].subtotal}
          </div>
          <Link
            className="flex text-xs italic underline text-blue-500 flex-col justify-center items-center "
            href={`/users/reviews/${item}`}
          >
            <span className="max-sm:text-xs">Write/Edit</span>
            <span className="max-sm:text-xs">a review</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OrderList;

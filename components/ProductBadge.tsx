import { ProductInfoType, ProductReviewType } from "@/types/Type";
import ReviewStar from "./ReviewStar";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProductBadge: React.FC<ProductInfoType & ProductReviewType> = (prod) => {
  const router = useRouter();

  return (
    <div className="max-md:max-w-[150px]">
      <Link
        className="flex flex-col justify-center items-center gap-3 rounded-xl shadow-lg py-5 px-3 border"
        href={`/products/${prod.prodName}`}
      >
        <img
          className="flex max-md:w-[60px] max-md:h-[50px]"
          src={prod.imageURL[0]}
          width={150}
          height={150}
        ></img>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="flex font-bold text-sm max-md:text-xs">
            {prod.fullName}
          </p>
          <ReviewStar avgRating={prod.avgRating} numReview={null} />
          <p className="flex font-bold text-lg font-mono max-md:text-sm">
            ${prod.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductBadge;

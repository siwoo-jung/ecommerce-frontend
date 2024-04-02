"use client";
import { ProductInfoType, ProductReviewType } from "@/types/Type";
import ProductBadge from "@/components/ProductBadge";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const initialProdInfo: (ProductInfoType & ProductReviewType)[] = [];

  const [prodInfo, setProdInfo] = useState(initialProdInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsURI: any = process.env.NEXT_PUBLIC_GET_PRODUCTS;
        const response = await axios.get(productsURI, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setProdInfo(response.data.body.products);
        router.refresh();
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-5 m-10">
      <div className="flex flex-col gap-5">
        <p className="font-bold font-serif">Featured</p>
        <div className="grid grid-cols-4 gap-4 max-sm:grid-cols-2">
          {prodInfo.map((info, index) => (
            <ProductBadge
              key={index}
              prodName={info.prodName}
              brand={info.brand}
              Category={info.Category}
              color={info.color}
              description={info.description}
              imageURL={info.imageURL}
              model={info.model}
              price={info.price}
              stock={info.stock}
              storage={info.storage}
              fullName={info.fullName}
              availColor={info.availColor}
              availStorage={info.availStorage}
              avgRating={info.avgRating}
              numReview={info.numReview}
              reviews={info.reviews}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

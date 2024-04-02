"use client";

import ProductBadge from "@/components/ProductBadge";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ProductInfoType, ProductReviewType } from "@/types/Type";

export default function Page({ params }: any) {
  const { slug } = params;
  const router = useRouter();

  const initialProdInfo: (ProductInfoType & ProductReviewType)[] = [];

  const [prodInfo, setProdInfo] = useState(initialProdInfo);
  const [numProd, setNumProd] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionsURI: any = process.env.NEXT_PUBLIC_COLLECTIONS + slug;
        const response = await axios.get(collectionsURI, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setProdInfo(response.data.body.products);
        setNumProd(response.data.body.count);
        router.refresh();
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5 m-10">
      <p className="flex justify-center text-3xl font-bold font-mono">
        {slug[0].toUpperCase() + slug.slice(1)}
      </p>
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
}

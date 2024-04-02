"use client";

import Image from "next/image";
import Link from "next/link";
import ProductBadge from "@/components/ProductBadge";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductInfoType, ProductReviewType } from "@/types/Type";
import { NEW_ARRIVALS, CATEGORIES, TRENDING } from "@/constants";
import AuthContext from "@/components/AuthContext";
import { useContext } from "react";

export default function Home() {
  const initialInfo: (ProductInfoType & ProductReviewType)[] = [];
  const [trendingInfo, setTrendingInfo] = useState(initialInfo);
  const [newArrivalsInfo, setNewArrivalsInfo] = useState(initialInfo);
  const { user } = useContext(AuthContext);

  const fetchTrendingData = async (product: string) => {
    const tempURI: any = process.env.NEXT_PUBLIC_GET_PRODUCTS;
    const productURI: any = tempURI + product;
    const response = await axios.get(productURI, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    setTrendingInfo((prev) => [...prev, response.data.body]);
  };

  const fetchNewArrivalsgData = async (product: string) => {
    const tempURI: any = process.env.NEXT_PUBLIC_GET_PRODUCTS;
    const productURI: any = tempURI + product;
    const response = await axios.get(productURI, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    setNewArrivalsInfo((prev) => [...prev, response.data.body]);
  };

  useEffect(() => {
    TRENDING.map((product, index) => {
      fetchTrendingData(product);
    });
    NEW_ARRIVALS.map((product, index) => {
      fetchNewArrivalsgData(product);
    });
  }, [user]);

  return (
    <main>
      <div className="flex flex-col px-10 mt-10 mx-52 gap-24 max-xl:m-0 max-md:px-1 max-md:gap-3">
        <div className="flex justify-center items-center">
          <Link href="/products">
            <Image
              src="/assets/images/main.png"
              alt="main"
              width={1000}
              height={1000}
              className="object-scale-down flex justify-center items-center relative"
            ></Image>
          </Link>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-5 max-md:gap-2">
          <div className="flex flex-col">
            <p className="text-lg text-blue-800 max-md:text-sm">Categories</p>
            <p className="font-bold text-2xl font-serif max-md:text-lg">
              Search By Category
            </p>
          </div>
          <div className="flex flex-row gap-3 justify-between flex-wrap">
            {CATEGORIES.map((category, index) => (
              <Link
                href={category.href}
                className="flex flex-col p-2 gap-2 min-w-[100px] justify-center items-center border-2 border-gray-500"
                key={index}
              >
                <div className="relative w-[50px] flex h-[50px]">
                  <Image
                    src={category.icon}
                    fill
                    alt={category.key}
                    className="relative"
                  />
                </div>

                <p className="flex text-sm">{category.label}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div className="flex flex-col gap-5 max-md:gap-2 flex-wrap">
          <div className="flex flex-col">
            <p className="text-lg text-blue-800 max-md:text-sm">Trending</p>
            <p className="font-bold text-2xl font-serif  max-md:text-lg">
              Monthly Hot Items
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 justify-between max-md:flex max-md:flex-row max-md:flex-wrap max-md:justify-center">
            {trendingInfo.map((prodInfo, index) => (
              <ProductBadge
                key={index}
                prodName={prodInfo.prodName}
                brand={prodInfo.brand}
                Category={prodInfo.Category}
                color={prodInfo.color}
                description={prodInfo.description}
                imageURL={prodInfo.imageURL}
                model={prodInfo.model}
                price={prodInfo.price}
                stock={prodInfo.stock}
                storage={prodInfo.storage}
                fullName={prodInfo.fullName}
                availColor={prodInfo.availColor}
                availStorage={prodInfo.availStorage}
                avgRating={prodInfo.avgRating}
                numReview={prodInfo.numReview}
                reviews={prodInfo.reviews}
              />
            ))}
          </div>
        </div>

        {/* New Arrivals */}
        <div className="flex flex-col gap-5 max-md:gap-2">
          <div className="flex flex-col">
            <p className="text-lg text-blue-800 max-md:text-sm">New Arrivals</p>
            <p className="font-bold text-2xl font-serif  max-md:text-lg">
              Monthly New Items
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 justify-between max-md:flex max-md:flex-row max-md:flex-wrap max-md:justify-center">
            {newArrivalsInfo.map((prodInfo, index) => (
              <ProductBadge
                key={index}
                prodName={prodInfo.prodName}
                brand={prodInfo.brand}
                Category={prodInfo.Category}
                color={prodInfo.color}
                description={prodInfo.description}
                imageURL={prodInfo.imageURL}
                model={prodInfo.model}
                price={prodInfo.price}
                stock={prodInfo.stock}
                storage={prodInfo.storage}
                fullName={prodInfo.fullName}
                availColor={prodInfo.availColor}
                availStorage={prodInfo.availStorage}
                avgRating={prodInfo.avgRating}
                numReview={prodInfo.numReview}
                reviews={prodInfo.reviews}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

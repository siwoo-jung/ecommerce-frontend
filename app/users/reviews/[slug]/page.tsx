"use client";

import { useContext, useState, useEffect, FormEvent } from "react";
import AuthContext from "@/components/AuthContext";
import { ProductInfoType, ProductReviewType } from "@/types/Type";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page({ params }: any) {
  const router = useRouter();
  const { slug } = params;
  const tempURI: any = process.env.NEXT_PUBLIC_GET_PRODUCTS;
  const prodURI: string = tempURI + slug;
  const { user } = useContext(AuthContext);

  const initialProdInfo: ProductInfoType & ProductReviewType = {
    prodName: "",
    brand: "",
    Category: [],
    color: "",
    description: "",
    imageURL: [""],
    model: "",
    price: 0,
    stock: 0,
    storage: "",
    fullName: "",
    availColor: [""],
    availStorage: [""],
    avgRating: 0,
    numReview: 0,
    reviews: {
      "": {
        date: "",
        description: "",
        firstName: "",
        lastName: "",
        rating: 0,
        title: "",
      },
    },
  };
  const [prodInfo, setProdInfo] = useState(initialProdInfo);

  async function fetchProductData() {
    return await axios.get(prodURI, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  }

  useEffect(() => {
    const getProductData = async () => {
      const response = await fetchProductData();
      setProdInfo(response.data.body);
    };
    getProductData();
  }, []);

  const brandModelString: string =
    prodInfo.brand.toLowerCase().split(" ").join("-") +
    "-" +
    prodInfo.model.toLowerCase().split(" ").join("-");

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmittng, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.reviews[brandModelString]?.rating) {
      setRating(user.reviews[brandModelString].rating);
    }

    setTitle(user?.reviews[brandModelString]?.title);
    setDescription(user?.reviews[brandModelString]?.description);
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(rating);
    console.log(title);
    console.log(description);
    console.log(user.email);
    console.log(brandModelString);

    try {
      setIsSubmitting(true);
      const userReviewURI: any = process.env.NEXT_PUBLIC_USER_REVIEW;
      await axios.post(
        userReviewURI,
        {
          email: user.email,
          rating: rating,
          title: title,
          description: description,
          prodId: brandModelString,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: prodInfo.fullName,
          imageURL: prodInfo.imageURL[0],
          prodName: prodInfo.prodName,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      router.push("/users/reviews");
    } catch (err: any) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <form
      className="flex flex-col items-center gap-4 mt-3 group"
      noValidate
      onSubmit={handleSubmit}
    >
      <Link
        href={`/products/${prodInfo.prodName}`}
        className="flex flex-row items-center gap-4"
      >
        <img src={prodInfo.imageURL[0]} width={50} height={50}></img>
        <div className="text-lg font-bold">{prodInfo.fullName}</div>
      </Link>

      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-3">
          <div className="rating flex flex-col gap-2">
            <label className="font-mono text-sm">Rating</label>
            <div className="flex flex-row">
              {[1, 2, 3, 4, 5].map((value, index) => (
                <input
                  key={index}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-yellow-300"
                  checked={rating == value}
                  onChange={() => setRating(value)}
                ></input>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-mono">
              Title
            </label>
            {user.reviews[brandModelString] ? (
              <input
                type="text"
                name="title"
                id="title"
                className="text-sm rounded-sm border border-gray-400 pl-1"
                placeholder={user.reviews[brandModelString].title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            ) : (
              <input
                type="text"
                name="title"
                id="title"
                className="text-sm rounded-sm border border-gray-400 pl-1"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-mono">
              Description
            </label>
            {user.reviews[brandModelString] ? (
              <textarea
                name="description"
                id="description"
                className="text-sm rounded-sm border border-gray-400 pl-1 min-h-[100px] min-w-[300px]"
                placeholder={user.reviews[brandModelString].description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            ) : (
              <textarea
                name="description"
                id="description"
                className="text-sm rounded-sm border border-gray-400 pl-1 min-h-[100px] min-w-[300px]"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            )}
          </div>
        </div>
      </div>
      <button type="submit" className="btn_auth">
        Submit
      </button>
    </form>
  );
}

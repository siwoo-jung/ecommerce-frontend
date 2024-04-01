"use client";
import axios from "axios";
import { useEffect, useState, FormEvent, useContext } from "react";
import AuthContext from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import "@/styles/globals.css";
import ReviewStar from "@/components/ReviewStar";
import ProductOptions from "@/components/ProductOptions";
import { initialProdInfo } from "@/constants";

export default function Page({ params }: any) {
  const router = useRouter();
  const { isLoggedIn, user, updateCart } = useContext(AuthContext);
  const { slug } = params;
  const tempURI: any = process.env.NEXT_PUBLIC_GET_PRODUCTS;
  const prodURI: string = tempURI + slug;

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

  const [focusedImage, setFocusedImage] = useState(prodInfo.imageURL[0]);

  useEffect(() => {
    if (prodInfo.imageURL[0].length > 0) {
      setFocusedImage(prodInfo.imageURL[0]);
    }
  }, [prodInfo]);

  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    if (!isLoggedIn) {
      setSubmitting(false);
      router.push("/auth/login");
      return;
    }

    if (prodInfo.stock < 1 || currentQuantity > prodInfo.stock) {
      alert("Too much quantity...");
      setCurrentQuantity(1);
      setSubmitting(false);
      router.refresh();
      return;
    }

    try {
      setIsUpdated(false);
      await updateCart(prodInfo, currentQuantity);
      setIsUpdated(true);
      setTimeout(() => {
        setIsUpdated(false);
      }, 5000);
    } catch (err: any) {
      console.log(err);
      alert(err);
    } finally {
      setSubmitting(false);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-3">
      <div className="flex flex-row gap-24 max-sm:gap-10 justify-center max-sm:flex-col">
        <div className="flex flex-col gap-3 shadow-xl border max-sm:hidden">
          <div className="flex justify-center">
            <img
              src={focusedImage}
              className="flex relative object-contain max-h-[400px]"
            ></img>
          </div>
          <div className="flex flex-row justify-center gap-2">
            {prodInfo.imageURL.map((url: string, index: number) => (
              <img
                key={index}
                src={url}
                onClick={() => setFocusedImage(url)}
                className="flex relative object-scale-down h-30 w-20 justify-center border-2"
              ></img>
            ))}
          </div>
        </div>
        <div className="border shadow-xl p-3 flex flex-col gap-4 w-1/2 max-sm:w-full">
          <p className="font-bold text-xl max-sm:text-lg">
            {prodInfo.fullName}
          </p>

          {/* PRICE */}
          <p className="text-lg font-sans">$ {prodInfo.price}</p>

          {/* OVERALL REVIEW */}
          <div className="flex gap-2">
            <ReviewStar
              avgRating={prodInfo.avgRating}
              numReview={prodInfo.numReview}
            />
            <p>|</p>
            {prodInfo.stock > 0 ? (
              <p className="text-emerald-700">In Stock</p>
            ) : (
              <p className="text-rose-700">Out of stock</p>
            )}
          </div>
          <div className="flex w-full max-sm:text-sm">
            {prodInfo.description}
          </div>

          {/* Product Colour */}
          {prodInfo.color && prodInfo.availColor && (
            <ProductOptions
              current={prodInfo.color}
              avail={prodInfo.availColor}
              slug={slug}
              object="Colour"
            />
          )}

          {/* Product Size */}
          {prodInfo.size && prodInfo.availSize && (
            <ProductOptions
              current={prodInfo.size}
              avail={prodInfo.availSize}
              slug={slug}
              object="Size"
            />
          )}
          {/* Product Processor */}
          {prodInfo.processor && prodInfo.availProcessor && (
            <ProductOptions
              current={prodInfo.processor}
              avail={prodInfo.availProcessor}
              slug={slug}
              object="Processor"
            />
          )}

          {/* Product Storage */}
          {prodInfo.storage && prodInfo.availStorage && (
            <ProductOptions
              current={prodInfo.storage}
              avail={prodInfo.availStorage}
              slug={slug}
              object="Storage"
            />
          )}

          {/* Product Memory */}
          {prodInfo.memory && prodInfo.availMemory && (
            <ProductOptions
              current={prodInfo.memory}
              avail={prodInfo.availMemory}
              slug={slug}
              object="Memory"
            />
          )}

          {/* Product Graphic Card */}
          {prodInfo.graphicCard && prodInfo.availGraphicCard && (
            <ProductOptions
              current={prodInfo.graphicCard}
              avail={prodInfo.availGraphicCard}
              slug={slug}
              object="Graphic Card"
            />
          )}

          {/* Product Operating System */}
          {prodInfo.operatingSystem && prodInfo.availOperatingSystem && (
            <ProductOptions
              current={prodInfo.operatingSystem}
              avail={prodInfo.availOperatingSystem}
              slug={slug}
              object="Operating System"
            />
          )}

          {/* Product Network */}
          {prodInfo.connectivity && prodInfo.availConnectivity && (
            <ProductOptions
              current={prodInfo.connectivity}
              avail={prodInfo.availConnectivity}
              slug={slug}
              object="Connectivity"
            />
          )}

          {/* Product NetFormatwork */}
          {prodInfo.format && prodInfo.availFormat && (
            <ProductOptions
              current={prodInfo.format}
              avail={prodInfo.availFormat}
              slug={slug}
              object="Format"
            />
          )}

          <form
            className="flex flex-row gap-3 justify-evenly group"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full">
              <div className="flex flex-row gap-8">
                <div className="flex flex-row">
                  <button
                    type="button"
                    className="w-[40px] h-[40px] font-bold border border-blue-300"
                    onClick={() =>
                      setCurrentQuantity((prev) => (prev <= 1 ? 1 : prev - 1))
                    }
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="flex items-center justify-center border w-[40px] h-[40px] border-blue-300"
                    value={currentQuantity}
                    onChange={(e) =>
                      setCurrentQuantity(
                        Number.isNaN(parseInt(e.target.value)) ||
                          parseInt(e.target.value) < 1
                          ? 1
                          : parseInt(e.target.value)
                      )
                    }
                    style={{ textAlign: "center" }}
                  ></input>
                  <button
                    type="button"
                    className="w-[40px] h-[40px] text-white font-bold border border-blue-300 bg-blue-700"
                    onClick={() => setCurrentQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>

                {prodInfo.stock > 0 ? (
                  <button
                    type="submit"
                    className="btn_auth h-full max-sm:text-xs"
                    disabled={submitting}
                  >
                    Add to cart
                  </button>
                ) : (
                  <button
                    className="p-2 text-sm rounded-md text-white font-bold shadow-2xl bg-blue-400 invalid:bg-white max-sm:text-xs"
                    disabled
                  >
                    Add to cart
                  </button>
                )}
              </div>
              <p className="flex text-sm text-rose-500 font-bold">
                {isUpdated && "Added to carts !"}
              </p>
            </div>
          </form>
        </div>
        <div className="hidden flex-col gap-3 max-sm:flex">
          <div className="flex justify-center">
            <img
              src={focusedImage}
              className="flex relative object-contain max-h-[400px]"
            ></img>
          </div>
          <div className="flex flex-row justify-center gap-2 max-sm:flex-wrap">
            {prodInfo.imageURL.map((url: string, index: number) => (
              <img
                key={index}
                src={url}
                onClick={() => setFocusedImage(url)}
                className="flex relative object-scale-down h-30 w-20 justify-center border-2"
              ></img>
            ))}
          </div>
        </div>
      </div>

      {/* Review Section */}
      {prodInfo.numReview > 0 && (
        <div className="bmax-w-screen-md ">
          <p className="text-2xl font-thin">REVIEWS</p>

          <div className="flex flex-col gap-4">
            {Object.keys(prodInfo.reviews).map((email, index) => (
              <div
                key={index}
                id={email}
                className="flex flex-col gap-4 border shadow-xl p-3 rounded-lg"
              >
                <div className="flex flex-col">
                  <div className="flex flex-col justify-between">
                    <p className="font-bold text-sm">
                      {prodInfo.reviews[email].firstName}{" "}
                      {prodInfo.reviews[email].lastName}
                    </p>
                    <p className="text-sm text-stone-400">
                      {prodInfo.reviews[email].date}
                    </p>
                  </div>
                  <ReviewStar
                    avgRating={prodInfo.reviews[email].rating}
                    numReview={null}
                  />
                </div>
                <p className="font-bold text-lg">
                  {prodInfo.reviews[email].title}
                </p>
                <p>{prodInfo.reviews[email].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

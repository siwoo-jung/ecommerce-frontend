import React from "react";
import Link from "next/link";
import { COLOR_MAP } from "@/constants";

interface Props {
  object: string;
  current: string;
  avail: string[];
  slug: string;
}

const ProductOptions: React.FC<Props> = ({ object, current, avail, slug }) => {
  return (
    <div className="flex flex-col gap-2">
      <p>
        {object}: <span>{current}</span>
      </p>
      <div className="flex flex-row gap-2 items-center">
        {object == "Colour"
          ? avail.map((_color, index) => (
              <div
                key={index}
                className="border-gray-300 border-2 w-8 h-8 rounded-full flex items-center justify-center"
              >
                <Link
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: COLOR_MAP[_color] }}
                  href={`${slug.replace(
                    current.toLowerCase().split(" ").join("-"),
                    avail[index].toLowerCase().split(" ").join("-")
                  )}`}
                ></Link>
              </div>
            ))
          : avail.map((cur, index) => (
              <Link
                key={index}
                href={`${slug.replace(
                  current.toLowerCase().split(" ").join("-"),
                  avail[index].toLowerCase().split(" ").join("-")
                )}`}
                className="flex relative h-full w-[100px] min-h-[40px] max-sm:w-[50px]"
              >
                {cur == current ? (
                  <button
                    type="button"
                    className="relative max-sm:text-xs w-full  text-sm font-medium text-white focus:outline-none bg-blue-500 rounded-lg border border-blue-500 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    {cur}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-full max-sm:text-xs text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-blue-500 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    {cur}
                  </button>
                )}
              </Link>
            ))}
      </div>
    </div>
  );
};

export default ProductOptions;

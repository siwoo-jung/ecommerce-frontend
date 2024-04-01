import React from "react";

interface Props {
  avgRating: number;
  numReview: number | null;
}

const ReviewStar: React.FC<Props> = ({ avgRating, numReview }) => {
  return (
    <div className="flex flex-row items-center">
      {Array.from({ length: Math.round(avgRating) }, (_, index) => (
        <div key={index}>
          <svg
            className="w-4 h-4 text-yellow-300 me-1 max-md:w-3 max-md:h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path
              d="M20.924 7.625a1.523 1.523 
            0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 
            0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 
            0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 
            0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 
            0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 
            0 0 0 .387-1.575Z"
            />
          </svg>
        </div>
      ))}
      {Array.from({ length: 5 - Math.round(avgRating) }, (_, index) => (
        <div key={index}>
          <svg
            className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500 max-md:w-3 max-md:h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
      ))}

      <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 max-md:text-xs">
        ({avgRating}) {numReview && `based on ${numReview} reviews`}
      </p>
    </div>
  );
};

export default ReviewStar;

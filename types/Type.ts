export type UserProfile = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  isAdmin: boolean;
  password: null;
  reviews: Review;
  uuid: null;
};

export type UserToUpdate = {
  email: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
};

export type Review = {
  [prodName: string]: {
    date: string;
    description: string;
    fullName: string;
    firstName: string;
    lastName: string;
    rating: number;
    title: string;
    imageURL: string;
    prodName: string;
  };
};

export type ProductInfoType = {
  prodName: string;
  brand: string;
  Category: string[];
  color: string;
  description: string;
  imageURL: string[];
  model: string;
  price: number;
  stock: number;
  storage?: string;
  fullName: string;
  availColor?: string[];
  availStorage?: string[];
  memory?: string;
  availMemory?: string[];
  processor?: string;
  availProcessor?: string[];
  operatingSystem?: string;
  availOperatingSystem?: string[];
  graphicCard?: string;
  availGraphicCard?: string[];
  connectivity?: string;
  availConnectivity?: string[];
  size?: string;
  availSize?: string[];
  format?: string;
  availFormat?: string[];
};

export type ProductReviewType = {
  avgRating: number;
  numReview: number;
  reviews: {
    [email: string]: {
      date: string;
      description: string;
      firstName: string;
      lastName: string;
      rating: number;
      title: string;
    };
  };
};

export type cartsType = {
  [prodId: string]: {
    quantity: number;
    fullName: string;
    unitPrice: number;
    imageURL: string;
    subtotal: number;
  };
};

export type orderType = {
  [orderNumber: string]: {
    cartInfo: cartsType;
    date: string;
    grandTotal: number;
  };
};

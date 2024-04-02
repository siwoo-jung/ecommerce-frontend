import { ProductInfoType, ProductReviewType } from "@/types/Type";

// NAVIGATION
export const NAV_LINKS = [
  { href: "/", key: "home", label: "Home" },
  { href: "/products", key: "products", label: "Products" },
  { href: "/about", key: "about", label: "About" },
];

export const USER_ICON_LOGIN_LINKS = [
  {
    href: "/users/",
    key: "myaccount",
    label: "My Account",
  },
  {
    href: "/users/carts",
    key: "carts",
    label: "Carts",
  },
];

export const USER_ICON_LOGOUT_LINKS = [
  { href: "/auth/login", key: "login", label: "Log In" },
  { href: "/auth/login", key: "signup", label: "Sign Up" },
];

export const MOBILE_LOGIN_LINKS = [
  { href: "/", key: "home", label: "Home" },
  { href: "/products", key: "products", label: "Products" },
  { href: "/about", key: "about", label: "About" },
  { href: "/users/", key: "myaccount", label: "My Account" },
  { href: "/users/carts", key: "carts", label: "Carts" },
];

export const MOBILE_LOGOUT_LINKS = [
  { href: "/", key: "home", label: "Home" },
  { href: "/products", key: "products", label: "Products" },
  { href: "/about", key: "about", label: "About" },
  { href: "/auth/login", key: "login", label: "Log In" },
  { href: "/auth/login", key: "signup", label: "Sign Up" },
];

export const USERS_PROFILE_LINKS = [
  {
    href: "/users/",
    key: "account",
    label: "Account Info",
    src: "/assets/icons/info.svg",
  },
  {
    href: "/users/carts",
    key: "carts",
    label: "My Carts",
    src: "/assets/icons/cart.svg",
  },
  {
    href: "/users/orders",
    key: "orders",
    label: "My Orders",
    src: "/assets/icons/wallet.svg",
  },
  {
    href: "/users/reviews",
    key: "reviews",
    label: "My Reviews",
    src: "/assets/icons/review.svg",
  },
];

export const COLOR_MAP: { [key: string]: string } = {
  "Black Titanium": "#454342",
  "White Titanium": "#E9E8E2",
  "Blue Titanium": "#565D6A",
  "Natural Titanium": "#9E9893",
  Mist: "#DBD4CC",
  Heartbreaker: "#DE8791",
  Daydream: "#9EC4B0",
  Cosmos: "#645982",
  Midnight: "#303640",
  Starlight: "#EEE5D4",
  "Space Grey": "#7D7E80",
  Silver: "#E3E4E6",
  "Titanium Grey": "#ACA49C",
  "Titanium Black": "#62605F",
  "Titanium Violet": "#4D4E5F",
  "Titanium Yellow": "#F1E1BB",
  Pink: "#D35E53",
  Green: "#B2BFAD",
  "Sky Blue": "#374F6A",
};

export const CATEGORIES = [
  {
    href: "/collections/computers",
    key: "computers",
    label: "Computers",
    icon: "/assets/icons/computer.svg",
  },
  {
    href: "/collections/monitors",
    key: "monitors",
    label: "Monitors",
    icon: "/assets/icons/tv.svg",
  },
  {
    href: "/collections/phones",
    key: "phones",
    label: "Phones",
    icon: "/assets/icons/phone.svg",
  },
  {
    href: "/collections/audios",
    key: "audios",
    label: "Audios",
    icon: "/assets/icons/headphones.svg",
  },
  {
    href: "/collections/tablets",
    key: "tablets",
    label: "Tablets",
    icon: "/assets/icons/tablet.svg",
  },
  {
    href: "/collections/gaming",
    key: "gaming",
    label: "Gaming",
    icon: "/assets/icons/console.svg",
  },
];

export const TRENDING = [
  "apple-iphone-15-pro-512gb-natural-titanium",
  "samsung-galaxy-s24-ultra-256gb-titanium-violet",
  "dell-inspiron-16-laptop-i5-512gb",
  "apple-airpods-max-sky-blue",
  "apple-iphone-15-pro-512gb-white-titanium",
];

export const NEW_ARRIVALS = [
  "apple-macbook-air-13-inch-m3-chip-8-core-cpu-8gb-memory-512gb-storage-starlight",
  "apple-ipad-pro-11-inch-space-grey-128gb-wifi",
  "lenovo-legion-pro-5i-16-gen9-windows-11-pro-64-32gb-memory-512gb-ssd-rtx-4070",
  "sony-ps5-playstation-5-slim-disc",
  "dell-inspiron-16-laptop-i7-1tb",
];

export const initialProdInfo: ProductInfoType & ProductReviewType = {
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
  memory: "",
  availMemory: [],
  processor: "",
  availProcessor: [],
  graphicCard: "",
  availGraphicCard: [],
  operatingSystem: "",
  availOperatingSystem: [],
  connectivity: "",
  availConnectivity: [],
  format: "",
  availFormat: [],
};

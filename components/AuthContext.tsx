import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  ProductInfoType,
  UserProfile,
  UserToUpdate,
  cartsType,
} from "@/types/Type";

interface AuthContextType {
  accessToken: string | null;
  user: UserProfile;
  onLogIn: (email: string, password: string) => Promise<void | Error>;
  onLoginSuccess: (response: any) => void;
  logout: () => void;
  updateUser: (userInfo: UserToUpdate) => Promise<void | Error>;
  isLoggedIn: boolean;
  cartInfo: cartsType;
  updateCart: (
    prodInfo: ProductInfoType,
    currentQuantity: number
  ) => Promise<void | Error>;
  saveCart: (cartInfo: cartsType) => Promise<void | Error>;
  checkoutCart: (grandTotal: number) => void;
}

const defaultAuthContextValue: AuthContextType = {
  accessToken: null,
  user: {
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    isAdmin: false,
    password: null,
    reviews: {
      "": {
        date: "",
        description: "",
        firstName: "",
        lastName: "",
        rating: 0,
        title: "",
        imageURL: "",
        fullName: "",
        prodName: "",
      },
    },
    uuid: null,
  },
  onLogIn: async () => {},
  onLoginSuccess: () => {},
  logout: () => {},
  updateUser: async () => {},
  isLoggedIn: false,
  cartInfo: {
    "": {
      quantity: 0,
      fullName: "",
      unitPrice: 0,
      imageURL: "",
      subtotal: 0,
    },
  },
  updateCart: async () => {},
  saveCart: async () => {},
  checkoutCart: async () => {},
};

interface AuthcontextProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

export const AuthProvider: React.FC<AuthcontextProps> = ({ children }) => {
  axios.defaults.withCredentials = true;
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile>(defaultAuthContextValue.user);
  const [cartInfo, setCartInfo] = useState<cartsType>(
    defaultAuthContextValue.cartInfo
  );

  const router = useRouter();

  useEffect(() => {
    onSilentRefresh();
  }, []);

  const onLogIn = async (
    email: string | null,
    password: string | null
  ): Promise<void | Error> => {
    if (!email || !password) {
      return new Error("Invalid email or password");
    }
    try {
      const authURI: any = process.env.NEXT_PUBLIC_LOGIN;
      const response = await axios.post(
        authURI,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      await onLoginSuccess(response);
    } catch (err: any) {
      throw err;
    }
  };

  const onLoginSuccess = async (response: any) => {
    setAccessToken(response.data.body.accessToken);
    const accessToken = response.data.body.accessToken;
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const cartInfoResponse = await getCartInfo(response.data.body.user.email);
    setCartInfo(cartInfoResponse.data.body);

    const refreshTimeString: any = process.env.NEXT_PUBLIC_JWT_EXPIRY_TIME;
    const refreshTimeNumber: number = parseInt(refreshTimeString!);
    setUser(response.data.body.user);
    setIsLoggedIn(true);

    setTimeout(() => {
      onSilentRefresh();
    }, refreshTimeNumber);
  };

  const getCartInfo = async (email: string) => {
    try {
      const authURI: any = process.env.NEXT_PUBLIC_GET_CARTS;
      const response = await axios.post(
        authURI,
        {
          email: email,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  const onSilentRefresh = async () => {
    try {
      const authURI: any = process.env.NEXT_PUBLIC_REFRESH;
      const response = await axios.post(
        authURI,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      onLoginSuccess(response);
    } catch (err: any) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      const authURI: any = process.env.NEXT_PUBLIC_LOGOUT;
      const response = await axios.get(authURI, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      setAccessToken(null);
      setIsLoggedIn(false);
      router.push("/");
    } catch (err: any) {
      console.log("Log out failed");
      console.log(err);
    }
  };

  const updateUser = async (userInfo: UserToUpdate) => {
    try {
      const authURI: any = process.env.NEXT_PUBLIC_USERUPDATE;
      const response = await axios.post(authURI, userInfo, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  const updateCart = async (
    prodInfo: ProductInfoType,
    currentQuantity: number
  ) => {
    try {
      const authURI: any = process.env.NEXT_PUBLIC_UPDATE_CARTS;
      const response = await axios.post(
        authURI,
        { ...prodInfo, quantity: currentQuantity, email: user.email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setCartInfo(response.data.body.carts);
    } catch (e) {
      throw e;
    }
  };

  const saveCart = async (cartInfo: cartsType) => {
    try {
      const authURI: any = process.env.NEXT_PUBLIC_SAVE_CARTS;
      const response = await axios.post(
        authURI,
        { cartInfo, email: user.email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setCartInfo(response.data.body.carts);
    } catch (e) {
      throw e;
    }
  };

  const checkoutCart = async (grandTotal: number) => {
    const authURI: any = process.env.NEXT_PUBLIC_CHECKOUT;
    try {
      await axios.post(
        authURI,
        {
          cartInfo,
          email: user.email,
          grandTotal: grandTotal,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setCartInfo({});
    } catch (e) {
      throw e;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        onLogIn,
        onLoginSuccess,
        logout,
        updateUser,
        isLoggedIn,
        cartInfo,
        updateCart,
        saveCart,
        checkoutCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

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
    console.log("=======Refreshing UseEffect Invoked=====");
    console.log(new Date());
    console.log(accessToken);
    onSilentRefresh();
  }, []);

  const onLogIn = async (
    email: string | null,
    password: string | null
  ): Promise<void | Error> => {
    console.log("--=======OnLogIn Starst=======");
    if (!email || !password) {
      return new Error("Invalid email or password");
    }
    try {
      const authURI: any = process.env.NEXT_PUBLIC_LOGIN;
      console.log("Sending data for log in");
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
      console.log("OnLogIn Successful");
      await onLoginSuccess(response);
    } catch (err: any) {
      throw err;
    }
  };

  const onLoginSuccess = async (response: any) => {
    console.log("======OnLoginSuccess Starts=======");
    console.log(response);
    setAccessToken(response.data.body.accessToken);
    const accessToken = response.data.body.accessToken;
    console.log(accessToken);
    console.log("changed");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    console.log("Header Authorization Set");

    const cartInfoResponse = await getCartInfo(response.data.body.user.email);
    console.log("cartInfoResponse is : ", cartInfoResponse);
    setCartInfo(cartInfoResponse.data.body);

    const refreshTimeString: any = process.env.NEXT_PUBLIC_JWT_EXPIRY_TIME;
    const refreshTimeNumber: number = parseInt(refreshTimeString!);
    console.log("OnLoginSuccess Successful");
    console.log(new Date());
    console.log(response);
    console.log("Setting user and isLoggedIn....");
    setUser(response.data.body.user);
    setIsLoggedIn(true);
    console.log("is Loged In? : ", isLoggedIn);
    console.log("========");
    console.log(user);
    console.log("========");

    setTimeout(() => {
      console.log("Set time out invoked");
      onSilentRefresh();
    }, refreshTimeNumber);
  };

  const getCartInfo = async (email: string) => {
    console.log("======getCartInfo Starts=======");
    console.log(email);
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

      console.log("getCartInfo Successful");
      return response;
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  const onSilentRefresh = async () => {
    console.log("======OnSilentRefersh Starts=======");
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

      console.log("OnSilentRefresh Successful");
      onLoginSuccess(response);
    } catch (err: any) {
      console.log(err);
    }
  };

  const logout = async () => {
    console.log("=====LotOut Starts=====");

    try {
      const authURI: any = process.env.NEXT_PUBLIC_LOGOUT;
      const response = await axios.get(authURI, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      setAccessToken(null);
      console.log("Log Out Successful");
      console.log("Pushing to /");
      router.push("/");
      console.log("Refreshing");
      setIsLoggedIn(false);
      router.push("/");
    } catch (err: any) {
      console.log("Log out failed");
      console.log(err);
    }
  };

  const updateUser = async (userInfo: UserToUpdate) => {
    console.log("========User Update Start========");
    try {
      const authURI: any = process.env.NEXT_PUBLIC_USERUPDATE;
      const response = await axios.post(authURI, userInfo, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      console.log("Update Successful");
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
      console.log("Invoking Cart Update");
      const authURI: any = process.env.NEXT_PUBLIC_UPDATE_CARTS;
      const response = await axios.post(
        authURI,
        { ...prodInfo, quantity: currentQuantity, email: user.email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Update Successful");
      setCartInfo(response.data.body.carts);
    } catch (e) {
      throw e;
    }
  };

  const saveCart = async (cartInfo: cartsType) => {
    try {
      console.log("Invoking Save Cart");
      const authURI: any = process.env.NEXT_PUBLIC_SAVE_CARTS;
      const response = await axios.post(
        authURI,
        { cartInfo, email: user.email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Save Successful");
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

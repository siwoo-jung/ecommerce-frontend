import {
  NAV_LINKS,
  USER_ICON_LOGIN_LINKS,
  USER_ICON_LOGOUT_LINKS,
  MOBILE_LOGIN_LINKS,
  MOBILE_LOGOUT_LINKS,
} from "@/constants";
import Link from "next/link";
import AuthContext from "@/components/AuthContext";
import { useContext, useState } from "react";
import Image from "next/image";

const Footbar = () => {
  const { accessToken, logout } = useContext(AuthContext);

  const [toggleMenuDropdown, setToggleMenuDropdown] = useState(false);
  const [toggleUserDropdown, setToggleUserDropdown] = useState(false);
  const [toggleCartDropdown, setToggleCartDropdown] = useState(false);

  return (
    <nav className="flex px-10 py-5 w-screen border-t-2 border-t-gray-200 mt-20">
      <div className="flex flex-row justify-center w-full items-center gap-10 max-sm:flex-col ">
        <div className="flex flex-col justify-center w-[400px] gap-3 px-10">
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={100}
              height={0}
            ></Image>
          </Link>
          <p className=" max-sm:text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br></br>
            Quibusdam ipsa possimus id quis quos magnam
          </p>
        </div>
        <div className="flex flex-row gap-10">
          <div className="flex flex-col gap-3">
            <p className="text-lg font-bold">Support</p>
            <div className="flex flex-col text-sm gap-2 max-sm:text-xs">
              <p>
                Lorem ipsum dolor sit amet <br></br>consectetur adipisicing elit
              </p>
              <p>siwoo.jg@gmail.com</p>
              <p>+61-466-624-891</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-lg font-bold">Account</p>
            <div className="flex flex-col text-sm max-sm:text-xs gap-2">
              <Link href="/auth/login">Log-in/Sign-up</Link>
              <Link href="/users">Account Info</Link>
              <Link href="/users/carts">Carts</Link>
              <Link href="/users/orders">Orders</Link>
              <Link href="/users/reviews">Reviews</Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-lg font-bold">Quick Link</p>
            <div className="flex flex-col text-sm max-sm:text-xs gap-2">
              <Link href="/about">About</Link>
              <Link href="https://www.linkedin.com/in/siwoojung/">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Footbar;

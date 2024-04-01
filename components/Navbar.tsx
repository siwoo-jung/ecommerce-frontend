import {
  NAV_LINKS,
  USER_ICON_LOGIN_LINKS,
  USER_ICON_LOGOUT_LINKS,
  MOBILE_LOGIN_LINKS,
  MOBILE_LOGOUT_LINKS,
} from "@/constants";
import Link from "next/link";
import AuthContext from "@/components/AuthContext";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [toggleMenuDropdown, setToggleMenuDropdown] = useState(false);
  const [toggleUserDropdown, setToggleUserDropdown] = useState(false);
  const [toggleCartDropdown, setToggleCartDropdown] = useState(false);

  const { isLoggedIn, cartInfo, accessToken } = useContext(AuthContext);

  const router = useRouter();

  // useEffect(() => {
  //   router.refresh();
  // }, [cartInfo]);

  return (
    <nav className="flex px-10 py-5 w-screen border-b-2 border-b-gray-200 h-[63px] ">
      <div className="flex flex-row justify-around w-full items-center ">
        <div className="flex items-center justify-center w-32 ">
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={100}
              height={0}
            ></Image>
          </Link>
        </div>

        <div className="md:flex hidden  gap-10 justify-center items-center">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className="regular-16 text-black cursor-pointer transition-all hover:font-bold font-serif"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="items-center w-32 flex-row md:flex hidden justify-evenly">
          {/* Desktop Carts Icon */}
          {isLoggedIn ? (
            <Link href="/users/carts" className="flex relative">
              <Image
                src="/assets/icons/cart.svg"
                alt="cart"
                width={30}
                height={30}
              ></Image>
              {isLoggedIn && Object.keys(cartInfo).length > 0 && (
                <div className="absolute bottom-4 left-5">
                  <div className="rounded-full text-sm text-white font-bold bg-blue-600 h-5 w-5 text-center justify-center items-center">
                    {Object.keys(cartInfo).length}
                  </div>
                </div>
              )}
            </Link>
          ) : (
            <Link href="/auth/login" className="flex relative">
              <Image
                src="/assets/icons/cart.svg"
                alt="cart"
                width={30}
                height={30}
              ></Image>
            </Link>
          )}

          {/* Desktop User Icon */}
          {isLoggedIn ? (
            <Link href="/users" className="flex relative">
              <Image
                src="/assets/icons/person_bright.svg"
                alt="user_logo"
                width={30}
                height={30}
                onClick={() => setToggleUserDropdown((prev) => !prev)}
              ></Image>
            </Link>
          ) : (
            <Link href="/auth/login" className="flex relative">
              <Image
                src="/assets/icons/person_bright.svg"
                alt="user_logo"
                width={30}
                height={30}
                onClick={() => setToggleUserDropdown((prev) => !prev)}
              ></Image>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex relative">
          <div className="flex">
            <Image
              src="/assets/icons/menu.svg"
              alt="menu"
              width={30}
              height={30}
              onClick={() => setToggleMenuDropdown((prev) => !prev)}
            ></Image>
            {toggleMenuDropdown && (
              <div className="absolute mt-10 flex flex-col gap-2 justify-end items-end right-0 w-full bg-white min-w-[100px] z-50">
                {accessToken
                  ? MOBILE_LOGIN_LINKS.map((link) => (
                      <Link
                        href={link.href}
                        key={link.key}
                        className="regular-16 text-black flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold text-sm"
                        onClick={() => setToggleMenuDropdown((prev) => !prev)}
                      >
                        {link.label}
                      </Link>
                    ))
                  : MOBILE_LOGOUT_LINKS.map((link) => (
                      <Link
                        href={link.href}
                        key={link.key}
                        className="regular-16 text-black flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold text-sm"
                        onClick={() => setToggleMenuDropdown((prev) => !prev)}
                      >
                        {link.label}
                      </Link>
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

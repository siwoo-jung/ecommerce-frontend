"use client";

import AuthContext from "@/components/AuthContext";
import { useContext } from "react";
import { USERS_PROFILE_LINKS } from "@/constants";
import Link from "next/link";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex justify-center max-sm:items-center">
      <div className="flex flex-row ml-10 mr-10 mt-10 w-full justify-evenly max-lg:flex-col max-sm:mx-1">
        <div className="flex flex-col gap-8 w-1/5 shadow-2xl rounded-lg p-8 max-lg:w-full max-md:py-3 max-lg:shadow-lg max-lg:items-center">
          <p className="min-lg:gray_gradient font-sans text-3xl">My Profile</p>
          <div className="flex flex-row gap-3 ">
            <Image
              src="/assets/icons/person_dark.svg"
              alt="person"
              height={50}
              width={50}
            ></Image>
            <div className="flex flex-col">
              <p className="font-bold">
                {user?.firstName} {user?.lastName}
              </p>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-10 max-md:gap-2">
            {USERS_PROFILE_LINKS.map((link, index) => (
              <div key={index} className="flex flex-row profile_navigator">
                <Link
                  href={link.href}
                  key={link.key}
                  className="flex flex-row gap-3 w-full"
                >
                  <Image src={link.src} width={20} height={20} alt="d"></Image>
                  <div className="flex px-2 py-1 rounded-lg">{link.label}</div>
                </Link>
              </div>
            ))}

            {/* Log Out */}
            <button
              className="flex flex-row gap-3 items-center profile_navigator"
              onClick={() => logout()}
            >
              <Image
                src="/assets/icons/logout.svg"
                width={20}
                height={20}
                alt="logout"
              ></Image>
              Log Out
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

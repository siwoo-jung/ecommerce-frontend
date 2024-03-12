"use client";

import "@/styles/globals.css";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface UserInfo {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
}

export default function Page() {
  const [isMember, setIsMember] = useState(true);
  const toggleMember = () => setIsMember((prev) => !prev);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userInfo: UserInfo = {
    email,
    password,
    firstName,
    lastName,
    phone,
    address,
  };

  const authURI: any = isMember
    ? process.env.NEXT_PUBLIC_LOGIN
    : process.env.NEXT_PUBLIC_SIGNUP;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(authURI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(isMember ? "Log-in failed" : "Sign-Up failed");
      }

      const msg = await response.json();
      const parsedMsg = JSON.parse(msg.body);

      if (parsedMsg.errorMsg) {
        alert(parsedMsg.errorMsg);
        throw new Error(parsedMsg.errorMsg);
      }

      if (isMember) {
        router.push("/");
      } else {
        window.location.reload();
      }
    } catch (e) {
      console.log("Fetch error:", e);
    }
  };

  return (
    <div className="flex flex-row gap-3 p-5 justify-center h-lvh items-center">
      <div className="basis-1/2 h-full relative">
        <Image
          src="/assets/images/login.jpg"
          alt="login_img"
          fill={true}
          className="srhink p-10 object-scale-down"
        ></Image>
      </div>

      <div className="flex flex-col gap-3 basis-1/3 p-10">
        <h1 className="text-xl font-mono font-bold text-center">
          {isMember
            ? "Siwoo's Membership Login"
            : "Join Siwoo's Membership Today"}
        </h1>
        <div className="flex gap-2 text-md justify-center">
          <div>{isMember ? "Not a member?" : "Already have account?"}</div>
          <button
            onClick={toggleMember}
            className="font-bold underline underline-offset-4"
          >
            {isMember ? "Sign Up" : "Log In"}
          </button>
        </div>
        <form onSubmit={handleSubmit} noValidate className="group">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <input
                required
                type="email"
                placeholder="Email"
                value={email}
                className="border-b border-y-neutral-400 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                pattern="^[a-z]+[\.]*[a-z0-9]+@[a-z]+\.[a-z]{2,}$"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter a valid email address
              </span>
            </div>
            <div className="flex flex-col">
              <input
                required
                type="password"
                placeholder="Password"
                value={password}
                className="border-b border-y-neutral-400 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                pattern=".{7,12}"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                You password must be between 7 and 12 characters long
              </span>
            </div>

            {!isMember && (
              <div className="flex flex-col">
                <input
                  required
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  className="border-b border-y-neutral-400 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                  pattern="^[a-zA-Z]+$"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Please enter a valid name
                </span>
              </div>
            )}
            {!isMember && (
              <div className="flex flex-col">
                <input
                  required
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  className="border-b border-y-neutral-400 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                  pattern="[a-zA-Z]+$"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Please enter a valid name
                </span>
              </div>
            )}
            {!isMember && (
              <div className="flex flex-col">
                <input
                  required
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  className="border-b border-y-neutral-400 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                  pattern="[0-9]+$"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Please enter valid numbers
                </span>
              </div>
            )}
            {!isMember && (
              <div className="flex flex-col">
                <input
                  required
                  type="text"
                  placeholder="Address"
                  value={address}
                  className="border-b border-y-neutral-400 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                  pattern="[a-zA-Z0-9]+$"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Please enter a valid address
                </span>
              </div>
            )}
            <div className="flex flex-row">
              {isMember ? (
                <button className="btn_auth basis-full" type="submit">
                  Log In
                </button>
              ) : (
                <div className="flex flex-row basis-full gap-5 items-center">
                  <button className="btn_auth basis-1/2" type="submit">
                    Sign Up
                  </button>
                  <div className="basis-1/2 text-right">Forgot Password?</div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

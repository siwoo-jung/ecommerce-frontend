"use client";

import "@/styles/globals.css";
import Image from "next/image";
import React, {
  FormEvent,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import Form from "@/components/Form";
import AuthContext from "@/components/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  console.log("======Auth/Login Starts=====");
  const router = useRouter();
  const { accessToken, onLogIn, isLoggedIn } = useContext(AuthContext);
  const [isMember, setIsMember] = useState(true);
  const toggleMember = () => setIsMember((prev) => !prev);
  let userInfo = useRef({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const authURI: any = process.env.NEXT_PUBLIC_SIGNUP;

  useEffect(() => {
    console.log("AuthLogin UseEffect invoked...");
    console.log(accessToken);
    if (isLoggedIn) {
      console.log("Rerouting from Auth/Login to /");
      router.replace("/");
      return;
    }
  }, [isLoggedIn]);

  console.log("Page tsx");
  console.log(accessToken);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("=====HandleSubmit Starts=====");
    console.log(userInfo);
    e.preventDefault();
    setSubmitting(true);

    console.log("Submitting...");
    console.log(submitting);
    console.log("submitted!");

    try {
      if (isMember) {
        console.log("Trigerring onLogIn");
        await onLogIn(userInfo.current.email, userInfo.current.password);
        console.log("Awaiting onLogIn finished");
      } else {
        let firstName = userInfo.current.firstName.toLowerCase();
        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        let lastName = userInfo.current.lastName.toLowerCase();
        lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

        await axios.post(
          authURI,
          {
            email: userInfo.current.email,
            password: userInfo.current.password,
            firstName: firstName,
            lastName: lastName,
            phone: userInfo.current.phone,
            address: userInfo.current.address,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        alert("Sign-Up Done!");
        console.log("Reloading");
        window.location.reload();
      }
    } catch (err: any) {
      console.log("Fetch error:", err.message);
      alert(err.response.data.body.message);
    } finally {
      console.log("Finally...setsubmitting false");
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-row gap-3 justify-center items-center -z-10 mt-3  max-sm:items-start max-sm:p-3 ">
      <div className="flex relative rounded-lg shadow-xl ml-4 mr-4 p-3 justify-center items-center h-3/4 max-sm:h-full">
        <div className="flex relative gap-3 h-full max-sm:flex-col max-sm:h-full">
          <div className="flex max-sm:h-52 max-sm:justify-center">
            <Image
              src="/assets/images/login.jpg"
              alt="login_img"
              width={300}
              height={50}
              className="max-sm:w-full object-cover rounded-md"
            ></Image>
          </div>
          <div className="flex items-center p-2 justify-center max-sm:h-full max-sm:justify-center max-sm:items-start ">
            <Form
              isMember={isMember}
              handleSubmit={handleSubmit}
              userInfo={userInfo}
              submitting={submitting}
              toggleMember={toggleMember}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

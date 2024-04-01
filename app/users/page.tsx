"use client";

import AuthContext from "@/components/AuthContext";
import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { user, updateUser } = useContext(AuthContext);

  const [submitting, setSubmitting] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    userInfo.email = userInfo.email == "" ? user.email : userInfo.email;
    userInfo.firstName =
      userInfo.firstName == "" ? user.firstName : userInfo.firstName;
    userInfo.lastName =
      userInfo.lastName == "" ? user.lastName : userInfo.lastName;
    userInfo.phone = userInfo.phone == "" ? user.phone : userInfo.phone;
    userInfo.address = userInfo.address == "" ? user.address : userInfo.address;
    userInfo.firstName = userInfo.firstName.toLowerCase();
    userInfo.firstName =
      userInfo.firstName.charAt(0).toUpperCase() + userInfo.firstName.slice(1);
    userInfo.lastName = userInfo.lastName.toLowerCase();
    userInfo.lastName =
      userInfo.lastName.charAt(0).toUpperCase() + userInfo.lastName.slice(1);
    try {
      await updateUser(userInfo);
      alert("Updated Successfully!");
      window.location.reload();
    } catch (err: any) {
      console.log("Update Failed");
      let errMsg = err.response.data.message;
      if (err.response.data.body) {
        errMsg = err.response.data.body.message;
      }
      alert(`Update Failed :${errMsg}`);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="shadow-2xl flex flex-col w-1/2 p-4 rounded-lg max-md:w-full max-lg:w-2/3 max-lg:shadow-lg">
      <p className="flex flex-row font-serif justify-end">
        Welcome,&nbsp;
        <span className="font-bold text-blue-600">
          {user?.firstName} {user?.lastName}&nbsp;!
        </span>
      </p>

      <form onSubmit={handleSubmit} noValidate className="group ">
        <p className="text-blue-800 font-bold mb-3">Your Account Information</p>
        <div className="flex flex-col gap-10 max-md:gap-4">
          <div className="flex flex-row gap-10 max-md:gap-1">
            <div className="flex flex-col gap-2 w-1/2">
              <div>First name</div>
              <input
                type="text"
                className="bg-gray-100 h-8 rounded-lg pl-2 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                pattern="^[a-zA-Z]+$"
                placeholder={user?.firstName}
                onChange={handleChange}
                name="firstName"
              ></input>
              <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter a valid name
              </span>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div>Last name</div>
              <input
                type="text"
                placeholder={user?.lastName}
                className="bg-gray-100 h-8 pl-2 rounded-lg  invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                pattern="^[a-zA-Z]+$"
                onChange={handleChange}
                name="lastName"
              ></input>
              <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter a valid name
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-10 max-md:gap-1">
            <div className="flex flex-col gap-2 w-1/2">
              <div>Email</div>
              <input
                type="email"
                className="bg-gray-100 h-8 pl-2 rounded-lg invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                placeholder={user?.email}
                pattern="^[a-z]+[\.]*[a-z0-9]+@[a-z]+\.[a-z]{2,}$"
                onChange={handleChange}
                name="email"
              ></input>
              <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter a valid email address
              </span>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div>Phone</div>
              <input
                type="text"
                placeholder={user?.phone}
                className="bg-gray-100 h-8 pl-2 rounded-lg  invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                pattern="[0-9]+$"
                onChange={handleChange}
                name="phone"
              ></input>
              <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter valid numbers
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-10 max-md:gap-1">
            <div className="flex flex-col gap-2 w-full">
              <div>Address</div>
              <input
                type="text"
                className="bg-gray-100 h-8 pl-2 rounded-lg invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                placeholder={user?.address}
                pattern="^[a-zA-Z0-9, \/\-]*$"
                onChange={handleChange}
                name="address"
              ></input>
              <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter a valid address
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <p>Change Password</p>
            <div className="flex flex-col gap-3">
              <div>
                <input
                  required
                  type="password"
                  placeholder="Current Password"
                  pattern=".{7,12}"
                  className="bg-gray-100 rounded-lg pl-2 h-8 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer w-full"
                  onChange={handleChange}
                  name="password"
                ></input>
                <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  You password must be between 7 and 12 characters long
                </span>
              </div>
              <div>
                <input
                  required
                  type="password"
                  placeholder="New Password"
                  className="bg-gray-100 h-8 pl-2 rounded-lg  invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer w-full"
                  pattern=".{7,12}"
                  onChange={handleChange}
                  name="newPassword"
                ></input>
                <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  You password must be between 7 and 12 characters long
                </span>
              </div>
              <div>
                <input
                  required
                  type="password"
                  placeholder="Confirm New Password"
                  className="bg-gray-100 h-8 pl-2 rounded-lg invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer w-full"
                  onChange={handleChange}
                  pattern={userInfo.newPassword}
                  name="confirmNewPassword"
                ></input>
                <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  New Passwords Do Not Match
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-lg flex gap-10 justify-end">
            <button
              type="button"
              onClick={() => {
                setSubmitting(false);
                window.location.reload();
              }}
            >
              Cancel
            </button>
            <button disabled={submitting} type="submit" className="btn_auth">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

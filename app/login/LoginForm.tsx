"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const ticket = {
      email,
      password,
    };

    // const response = await fetch(
    //   "https://5yywz38qkd.execute-api.ap-southeast-2.amazonaws.com/dev/users",
    //   {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(ticket),
    //   }
    // );

    const response = await fetch(
      "https://5yywz38qkd.execute-api.ap-southeast-2.amazonaws.com/dev/users",
      {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    alert(response.body);

    // Handle response if necessary
    // const data = await response.json();
    // ...
  };

  return (
    <div>
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5">
          <input
            required
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email}
            className="border-b border-y-neutral-400"
          />
          <input
            required
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border-b border-y-neutral-400"
          />
        </div>
        <button>Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;

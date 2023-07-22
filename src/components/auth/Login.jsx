"use client";

import Link from "next/link";
import { initialLoginData } from "@/constants/auth";
import { useState } from "react";
import { API_URL } from "@/constants/apiUrl";
import { saveToBrowser } from "@/lib/auth/saveToBrowser";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Login = () => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [loginData, setLoginData] = useState(initialLoginData);

   const handleChangeEvent = (e) => {
      const { name, value } = e.target;
      setLoginData({ ...loginData, [name]: value });
   };

   const handleSubmitLogin = async () => {
      setLoading(true);
      const { email, password } = loginData;
      const res = await fetch(`${API_URL}/auth/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, password }),
      });
      const { record, token } = await res.json();
      if (record && token) {
         toast.success("Login successful, reloading");
         saveToBrowser(record, token);
         setLoading(false);
         router.push("/");
      }
   };

   return (
      <main className="max-w-sm m-auto">
         <section className="space-y-10">
            <div className="text-center space-y-2">
               <h2>Login</h2>
               <p>Please login with your details</p>
            </div>
            <div className="space-y-4">
               <input disabled={loading} name="email" placeholder="email@domain.com" type="email" onChange={handleChangeEvent} />
               <input disabled={loading} name="password" placeholder="password" type="password" onChange={handleChangeEvent} />
               <button disabled={loading} className="btn-primary" onClick={handleSubmitLogin}>
                  Login
               </button>
            </div>
            <div>
               Don't have an account ?{" "}
               <Link href="/join">
                  <span className="link">Sign up</span>
               </Link>
            </div>
         </section>
      </main>
   );
};

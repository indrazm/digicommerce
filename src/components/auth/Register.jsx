"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { initialRegisterData } from "@/constants/auth";
import { API_URL } from "@/constants/apiUrl";
import { toast } from "react-hot-toast";

export const Register = () => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [registerData, setRegisterData] = useState(initialRegisterData);

   const handleChangeEvent = (e) => {
      const { name, value } = e.target;
      setRegisterData({ ...registerData, [name]: value });
   };

   const handleSubmitRegister = async () => {
      setLoading(true);
      const { name, email, password } = registerData;
      const res = await fetch(`${API_URL}/auth/register`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data) {
         toast.success("Register succesful, please do login");
         router.push("/login");
         setLoading(false);
      }
   };

   return (
      <main className="max-w-sm m-auto">
         <section className="space-y-10">
            <div className="text-center space-y-2">
               <h2>Join</h2>
               <p>Please register with your details</p>
            </div>
            <div className="space-y-4">
               <input name="name" placeholder="Full name" onChange={handleChangeEvent} />
               <input name="email" placeholder="email@something.com" type="email" onChange={handleChangeEvent} />
               <input name="password" placeholder="pasword" type="password" onChange={handleChangeEvent} />
               <button disabled={loading} className="btn-primary" onClick={handleSubmitRegister}>
                  Join
               </button>
            </div>
            <div>
               Have an account ?{" "}
               <Link href="/login">
                  <span className="link">Login</span>
               </Link>
            </div>
         </section>
      </main>
   );
};

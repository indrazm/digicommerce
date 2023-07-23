"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserHeader = () => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const user_record = Cookies.get("user_record");
      if (user_record) {
         const user = JSON.parse(user_record);
         setUser(user);
      }
   }, []);

   if (!user) {
      return (
         <nav className="flex gap-12">
            <Link href="/join">
               <div>Join</div>
            </Link>
            <Link href="/login">
               <div>Sign in</div>
            </Link>
         </nav>
      );
   }

   return (
      <div className="relative">
         <Link href="/dashboard">
            <div className="cursor-pointer">Dashboard</div>
         </Link>
      </div>
   );
};

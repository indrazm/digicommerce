"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const UserHeader = () => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const user_record = localStorage.getItem("user_record");
      const user = JSON.parse(user_record);
      setUser(user);
   }, []);

   if (!user) {
      return (
         <nav className="flex gap-6">
            <div>Join</div>
            <div>Sign in</div>
         </nav>
      );
   }

   return (
      <div className="relative">
         <Link href="/dashboard">
            <div className="cursor-pointer">{user.email}</div>
         </Link>
      </div>
   );
};

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const menu = [
   { label: "Create product", route: "/create-product" },
   { label: "Sign out", route: "/create-product" },
];

export const UserHeader = () => {
   const [isMenuShowed, setIsMenuShowed] = useState(false);
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
         <div onClick={() => setIsMenuShowed(true)} className="cursor-pointer">
            {user.email}
         </div>
         {isMenuShowed && (
            <div className="absolute top-10 right-0 w-[180px] p-2 border-2 border-primary-content bg-zinc-600/20 rounded-lg">
               <OutsideClickHandler onOutsideClick={() => setIsMenuShowed(false)}>
                  {menu.map((item, index) => {
                     return (
                        <Link href={item.route} key={index}>
                           <div className="py-2 px-4 cursor-pointer hover:text-primary">{item.label}</div>
                        </Link>
                     );
                  })}
               </OutsideClickHandler>
            </div>
         )}
      </div>
   );
};

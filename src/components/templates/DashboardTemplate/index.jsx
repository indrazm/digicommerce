"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from "../../../../public/digicommer-logo.svg";
import { Chart2, Box1, TableDocument } from "iconsax-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const menu = [
   { label: "Dashboard", icon: <Chart2 />, route: "/dashboard" },
   { label: "Products", icon: <Box1 />, route: "/dashboard/products" },
   { label: "Order", icon: <TableDocument />, route: "/dashboard/order" },
];

export const DashboardTemplate = ({ children }) => {
   const router = useRouter();

   const handleLogout = () => {
      Cookies.remove("user_record");
      Cookies.remove("user_token");
      router.push("/");
   };
   return (
      <div className="h-screen flex gap-12">
         <aside className="w-[260px] border-r-2 bg-zinc-900/50 border-zinc-800/50 p-8 flex flex-col justify-between">
            <div className="space-y-12">
               <Link href="/">
                  <Image alt="Logo" src={Logo} width={160} />
               </Link>
               <div>
                  {menu.map((item) => {
                     return (
                        <Link href={item.route}>
                           <div className="p-3 text-zinc-500 hover:text-white hover:bg-primary cursor-pointer rounded-btn flex gap-4 items-center">
                              <div>{item.icon}</div>
                              <div>{item.label}</div>
                           </div>
                        </Link>
                     );
                  })}
               </div>
            </div>
            <div className="space-y-4 text-zinc-600">
               <div className="w-fit cursor-pointer hover:text-white">Edit Profile</div>
               <div className="w-fit cursor-pointer hover:text-white" onClick={handleLogout}>
                  Logout
               </div>
            </div>
         </aside>
         <div className="w-[calc(100vw-320px)] p-12 overflow-y-auto">{children}</div>
      </div>
   );
};

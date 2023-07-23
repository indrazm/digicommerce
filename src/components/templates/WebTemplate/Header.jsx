import React from "react";
import { UserHeader } from "@/components/user/userHeader";
import { Bag2 } from "iconsax-react";
import Link from "next/link";

export const Header = () => {
   return (
      <header className="flex justify-between p-8">
         <nav className="flex gap-6">
            <Link href="/">
               <div>All Products</div>
            </Link>
            <div>Browse</div>
         </nav>
         <div className="flex gap-4">
            <UserHeader />
            <Bag2 />
         </div>
      </header>
   );
};

import React from "react";
import { UserHeader } from "@/components/user/userHeader";
import { UserCart } from "@/components/user/UserCart";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/digicommer-logo.svg";

export const Header = () => {
   return (
      <header className="flex items-center justify-between p-8">
         <nav className="flex items-center gap-12">
            <Link href="/">
               <Image alt="Logo" src={Logo} width={160} />
            </Link>
            <Link href="/">
               <div>All Products</div>
            </Link>
         </nav>
         <div className="flex gap-12">
            <UserHeader />
            <UserCart />
         </div>
      </header>
   );
};

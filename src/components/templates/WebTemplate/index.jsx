"use client";

import React from "react";
import { Header } from "./Header";
import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export const WebTemplate = ({ children }) => {
   const path = usePathname();

   if (path.startsWith("/dashboard")) {
      return <>{children}</>;
   }

   return (
      <div className="space-y-20 min-h-screen flex flex-col justify-between">
         <div className="space-y-20">
            <Header />
            <div className="p-8 max-w-7xl m-auto">{children}</div>
         </div>
         <Footer />
      </div>
   );
};

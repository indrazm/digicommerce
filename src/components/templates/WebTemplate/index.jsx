"use client";

import React from "react";
import { Header } from "./Header";
import { usePathname } from "next/navigation";

export const WebTemplate = ({ children }) => {
   const path = usePathname();

   if (path.startsWith("/dashboard")) {
      return <>{children}</>;
   }

   return (
      <div className="space-y-20">
         <Header />
         <div className="p-8">{children}</div>
      </div>
   );
};

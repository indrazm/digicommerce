import React from "react";
import { Header } from "./Header";

export const WebTemplate = ({ children }) => {
   return (
      <div className="space-y-20">
         <Header />
         <div className="p-8">{children}</div>
      </div>
   );
};

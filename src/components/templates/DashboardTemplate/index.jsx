import React from "react";

const menu = [
   { label: "Dashboard", route: "/dashboard" },
   { label: "Products", route: "/dashboard/products" },
   { label: "Order", route: "/dashboard/order" },
];

export const DashboardTemplate = ({ children }) => {
   return (
      <div className="h-screen flex gap-12">
         <aside className="w-[260px] border-r-2 bg-zinc-900 border-zinc-800 p-8 space-y-12">
            <div className="font-bold">eCommerce</div>
            <div>
               {menu.map((item) => {
                  return <div className="p-3 hover:bg-primary cursor-pointer rounded-btn">{item.label}</div>;
               })}
            </div>
         </aside>
         <div className="w-[calc(100vw-320px)] p-12 overflow-y-auto">{children}</div>
      </div>
   );
};
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IMAGE_URL } from "@/constants/imageUrl";

export const Checkout = () => {
   const [cart, setCart] = useState([]);

   useEffect(() => {
      const itemsInCart = localStorage.getItem("user_cart");
      if (itemsInCart) {
         const items = JSON.parse(itemsInCart);
         setCart(items);
      }
   }, []);

   return (
      <div className="space-y-12 max-w-4xl m-auto">
         <h1>Checkout</h1>
         <section>
            {cart.map((item, index) => {
               return (
                  <div key={index} className="flex items-center gap-8 w-full bg-black/40 p-8 rounded-xl">
                     <div>
                        <Image
                           alt={item.featuredImage}
                           src={`${IMAGE_URL}/${item.id}/${item.featuredImage}`}
                           width={120}
                           height={120}
                           className="rounded-xl"
                        />
                     </div>
                     <div className="space-y-3 w-full">
                        <div className="flex items-center justify-between ">
                           <h3>{item.name}</h3>
                           <div className="flex gap-8 items-center">
                              <div className="font-light">${item.price}</div>
                              <button className="btn-xs btn-error w-fit" onClick={() => handleDeleteItemInCart(index)}>
                                 x
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               );
            })}
         </section>
         <section className="flex items-center justify-between">
            <h3>Total</h3>
            <button className="w-fit btn-primary">Checkout</button>
         </section>
      </div>
   );
};

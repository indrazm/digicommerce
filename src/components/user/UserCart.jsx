"use client";

import React, { useEffect, useState } from "react";
import { Bag2 } from "iconsax-react";
import OutsideClickHandler from "react-outside-click-handler";
import { IMAGE_URL } from "@/constants/imageUrl";
import Image from "next/image";

export const UserCart = () => {
   const [isShowCart, setIsShowCart] = useState(false);
   const [cart, setCart] = useState([]);

   const handleLoadCart = () => {
      const itemsInCart = localStorage.getItem("user_cart");
      if (itemsInCart) {
         const items = JSON.parse(itemsInCart);
         setCart(items);
      }
   };

   const handleDeleteItemInCart = (index) => {
      console.log(index);
      const itemsInCart = localStorage.getItem("user_cart");
      if (itemsInCart) {
         const items = JSON.parse(itemsInCart);
         const newItems = [...items];
         newItems.splice(index, 1);
         setCart(newItems);
         localStorage.setItem("user_cart", JSON.stringify(newItems));
      }
   };

   useEffect(() => {
      handleLoadCart();
   }, [isShowCart]);

   return (
      <div className="relative">
         <Bag2 onClick={() => setIsShowCart(true)} className="hover:text-white cursor-pointer" />
         {isShowCart && (
            <div className="absolute top-10 right-0 bg-black/30 shadow-2xl p-6 rounded-xl w-[400px]">
               <OutsideClickHandler onOutsideClick={() => setIsShowCart(false)}>
                  {cart.length > 0 ? (
                     <div className="space-y-8">
                        {cart.map((item, index) => {
                           return (
                              <div key={index} className="flex gap-4">
                                 <div>
                                    <Image
                                       alt={item.featuredImage}
                                       src={`${IMAGE_URL}/${item.id}/${item.featuredImage}`}
                                       width={80}
                                       height={80}
                                       className="rounded-xl"
                                    />
                                 </div>
                                 <div className="space-y-1">
                                    <div>{item.name}</div>
                                    <button className="btn-xs btn-error w-fit" onClick={() => handleDeleteItemInCart(index)}>
                                       Delete
                                    </button>
                                 </div>
                              </div>
                           );
                        })}
                        <button className="btn-secondary btn-sm">Checkout</button>
                     </div>
                  ) : (
                     <p className="text-center">No product in cart</p>
                  )}
               </OutsideClickHandler>
            </div>
         )}
      </div>
   );
};

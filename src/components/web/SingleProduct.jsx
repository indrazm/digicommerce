"use client";

import { Suspense } from "react";
import Avatar from "boring-avatars";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { IMAGE_URL } from "@/constants/imageUrl";

export const SingleProduct = ({ item }) => {
   const { id, name, shortDescription, overview, featuredImage, price, images, category, user } = item;
   const productImages = JSON.parse(images);

   const handleAddProductToCart = async () => {
      let cart = [];
      const itemsInCart = localStorage.getItem("user_cart");
      if (itemsInCart) {
         const existingCart = JSON.parse(itemsInCart);
         cart = [...existingCart];
      } else {
         cart = [];
      }

      const isProductExist = cart.filter((e) => e.id === id).length > 0;
      if (isProductExist) {
         toast.error("You have added this product");
         return;
      } else {
         cart.push({ id, name, price, featuredImage });
         localStorage.setItem("user_cart", JSON.stringify(cart));
         toast.success("Added to cart");
      }
   };

   return (
      <main className="space-y-12 max-w-6xl m-auto">
         <section className="flex items-end justify-between">
            <div className="space-y-4">
               <div className="space-y-3">
                  <div className="py-1 px-4 rounded-full border-2 border-zinc-500 bg-zinc-900 w-fit">{category.name}</div>
                  <h1>{name}</h1>
                  <p>{shortDescription}</p>
               </div>
               <div className="flex gap-4 items-center bg-black/50 hover:bg-primary p-4 w-fit rounded-xl cursor-pointer  ">
                  <Avatar name={user.name} size={28} />
                  <p className="font-semi text-white">{user.name}</p>
               </div>
            </div>
            <button className="btn-primary w-fit" onClick={handleAddProductToCart}>
               ${price} Add to cart
            </button>
         </section>
         <Suspense>
            <section className="grid grid-cols-2 gap-12">
               {productImages.map((item, index) => {
                  return (
                     <Image
                        key={index}
                        id={id}
                        src={`${IMAGE_URL}/${id}/${item}`}
                        width={800}
                        height={800}
                        className="rounded-2xl hover:scale-105 transition duration-300"
                     />
                  );
               })}
            </section>
         </Suspense>
         <section className="space-y-4">
            <h2>Overview</h2>
            <div className="whitespace-pre-wrap">{overview}</div>
         </section>
      </main>
   );
};

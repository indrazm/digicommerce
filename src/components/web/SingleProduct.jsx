"use client";

import Image from "next/image";
import { downloadFile } from "@/lib/s3/downloadFile";
import { Suspense } from "react";
import { ImageCard } from "./ImageCard";

export const SingleProduct = ({ item }) => {
   const { id, name, shortDescription, overview, price, images, category, user } = item;
   const productImages = JSON.parse(images);

   return (
      <main className="space-y-12 max-w-6xl m-auto">
         <section className="flex items-end justify-between">
            <div>
               <h1>{name}</h1>
               <p>{shortDescription}</p>
            </div>
            <button className="btn-primary w-fit">Buy ${price}</button>
         </section>
         <Suspense>
            <section className="grid grid-cols-2 gap-12">
               {productImages.map((item, index) => {
                  return <ImageCard key={index} id={id} src={item} />;
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

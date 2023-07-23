"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { downloadFile } from "@/lib/s3/downloadFile";
import Link from "next/link";

export const ProductCard = ({ id, name, price, image }) => {
   const [img, setImg] = useState("");

   const getFile = async () => {
      const file = await downloadFile(image, id);
      setImg(file);
   };

   useEffect(() => {
      getFile();
   }, []);

   return (
      <Suspense fallback={<div className="h-[260px] w-full bg-slate-500 animate-pulse rounded-t-xl"></div>}>
         <Link href={"/product/" + id}>
            <div className="card bg-zinc-900 card-bordered">
               <div className="relative">
                  {img && (
                     <Image src={img} width={600} height={200} quality={50} alt={name} className="h-[260px] object-cover rounded-t-xl" />
                  )}
               </div>
               <div className="p-6 flex justify-between">
                  <div>{name}</div>
                  <div>${price}</div>
               </div>
            </div>
         </Link>
      </Suspense>
   );
};

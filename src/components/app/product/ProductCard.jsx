"use client";

import Image from "next/image";
import Link from "next/link";
import { IMAGE_URL } from "@/constants/imageUrl";

export const ProductCard = ({ id, slug, name, price, featuredImage }) => {
   return (
      <Link href={"/product/" + slug}>
         <div className="card bg-zinc-900 card-bordered">
            <div className="relative">
               <Image
                  src={`${IMAGE_URL}/${id}/${featuredImage}`}
                  width={600}
                  height={200}
                  quality={50}
                  alt={name}
                  className="h-[260px] object-cover rounded-t-xl"
               />
            </div>
            <div className="p-6 flex justify-between">
               <div>{name}</div>
               <div>${price}</div>
            </div>
         </div>
      </Link>
   );
};

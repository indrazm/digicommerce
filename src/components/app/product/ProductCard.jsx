import React from "react";
import Image from "next/image";
import Placeholder from "../../../../public/placeholder.png";

export const ProductCard = ({ name, price, image }) => {
   return (
      <div className="card bg-zinc-900 card-bordered">
         <Image src={Placeholder} alt={name} className="h-[200px] object-cover rounded-t-xl" />
         <div className="p-4 flex justify-between">
            <div>{name}</div>
            <div>USD {price}</div>
         </div>
      </div>
   );
};

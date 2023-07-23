"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { downloadFile } from "@/lib/s3/downloadFile";
import Link from "next/link";

export const ImageCard = ({ id, src }) => {
   const [img, setImg] = useState("");

   const getFile = async () => {
      const file = await downloadFile(src, id);
      setImg(file);
   };

   useEffect(() => {
      getFile();
   }, [src]);

   return (
      <div>
         {img && (
            <Image src={img} width={600} height={400} quality={50} alt="Product Image" className="h-[400px] object-cover rounded-xl" />
         )}
      </div>
   );
};

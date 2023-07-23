"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/constants/apiUrl";
import { toast } from "react-hot-toast";
import { uploadFile } from "@/lib/s3/uploadFile";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const CreateProduct = ({ categoryData = [] }) => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [productData, setProductData] = useState({});
   const [featuredImage, setFeaturedImage] = useState("");
   const [files, setFiles] = useState([]);

   const handleChangeEvent = (e) => {
      const { name, value } = e.target;
      setProductData({ ...productData, [name]: value });
   };

   const handleSubmitCreateProduct = async () => {
      setLoading(true);
      const { name, description, price, categoryId } = productData;
      const user = localStorage.getItem("user_record");
      const userId = JSON.parse(user).id;
      const images = files[0].name;

      const res = await fetch(`${API_URL}/product`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ name, description, price, images, categoryId, userId }),
      });
      const { data } = await res.json();
      if (data) {
         const { id } = data;
         uploadFile(files[0], id);
         setLoading(false);
         toast.success("Creating Product Success...");
         console.log(data);
         router.refresh();
         router.push("/dashboard/products");
      }
   };

   const handleCreateFeaturedImage = () => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
         const result = fileReader.result;
         setFeaturedImage(result);
      };
      fileReader.readAsDataURL(files[0]);
   };

   useEffect(() => {
      if (files.length >= 1) {
         handleCreateFeaturedImage();
      }
   }, [files]);

   useEffect(() => {
      setProductData({ ...productData, categoryId: categoryData[0].id });
   }, []);

   return (
      <main className="space-y-8 max-w-lg m-auto">
         <section className="border-b-2 pb-4 border-zinc-800">
            <h3>Create Product</h3>
            <p>Please fill the product details</p>
         </section>
         <section className="space-y-3">
            <label>Name</label>
            <input name="name" placeholder="Product name" onChange={handleChangeEvent} />
            <label>Description</label>
            <textarea name="description" placeholder="Product description" rows={6} onChange={handleChangeEvent} />
            <label>Price - in USD</label>
            <input name="price" type="number" placeholder="29" onChange={handleChangeEvent} />
            <label>Category</label>
            <select name="categoryId" onChange={handleChangeEvent}>
               {categoryData.map((item) => {
                  return (
                     <option key={item.id} value={item.id}>
                        {item.name}
                     </option>
                  );
               })}
            </select>
         </section>
         <section className="space-y-3">
            <label>Featured Image</label>
            {featuredImage && <Image src={featuredImage} alt="featuredImage" width={300} height={240} className="rounded-lg" />}
            <input type="file" className="file-input file-input-bordered w-full" onChange={(e) => setFiles(e.target.files)} />
         </section>
         <button disabled={loading} onClick={handleSubmitCreateProduct}>
            Create Product
         </button>
      </main>
   );
};

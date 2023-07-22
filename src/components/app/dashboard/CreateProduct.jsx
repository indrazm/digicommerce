"use client";

import { useState } from "react";
import { API_URL } from "@/constants/apiUrl";
import { toast } from "react-hot-toast";

export const CreateProduct = ({ categoryData = [] }) => {
   const [loading, setLoading] = useState(false);
   const [productData, setProductData] = useState({});

   const handleChangeEvent = (e) => {
      const { name, value } = e.target;
      setProductData({ ...productData, [name]: value });
   };

   const handleSubmitCreateProduct = async () => {
      setLoading(true);
      const { name, description, price, categoryId } = productData;
      const user = localStorage.getItem("user_record");
      const userId = JSON.parse(user).id;
      const images = "";

      const res = await fetch(`${API_URL}/product`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ name, description, price, images, categoryId, userId }),
      });
      const data = await res.json();
      if (data) {
         setLoading(false);
         toast.success("Creating Product Success...");
      }
   };

   return (
      <main className="space-y-8 max-w-lg m-auto">
         <section className="border-b-2 pb-4 border-zinc-800">
            <h3>Create Product</h3>
            <p>Please fill the product details</p>
         </section>
         <section className="space-y-3">
            <label>Name</label>
            <input name="name" onChange={handleChangeEvent} />
            <label>Description</label>
            <textarea name="description" rows={6} onChange={handleChangeEvent} />
            <label>Price - in USD</label>
            <input name="price" type="number" onChange={handleChangeEvent} />
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
            <input type="file" className="file-input file-input-bordered w-full" />
         </section>
         <button disabled={loading} onClick={handleSubmitCreateProduct}>
            Create Product
         </button>
      </main>
   );
};

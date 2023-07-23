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
   const [productImages, setProductImages] = useState([]);
   const [featuredImageFile, setFeaturedImageFile] = useState([]);
   const [productImageFiles, setProductImageFiles] = useState([]);
   const [downloadableFile, setDownloadableFile] = useState(null);

   const handleChangeEvent = (e) => {
      const { name, value } = e.target;
      setProductData({ ...productData, [name]: value });
   };

   const handleSubmitCreateProduct = async () => {
      // setLoading(true);
      const { name, shortDescription, overview, price, categoryId } = productData;
      const user = localStorage.getItem("user_record");
      const userId = JSON.parse(user).id;

      const featuredImage = featuredImageFile[0].name;
      const images = JSON.stringify(productImages.map((item) => item.fileName));
      const file = downloadableFile[0].name;

      const res = await fetch(`${API_URL}/product`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            name,
            shortDescription,
            overview,
            price,
            categoryId,
            featuredImage,
            images,
            userId,
            file,
         }),
      });

      const { data } = await res.json();
      if (data) {
         const { id } = data;

         try {
            //Upload Single Featured Image
            uploadFile(featuredImageFile[0], id);

            //Upload ProductImages
            for (let i = 0; i < productImageFiles.length; i++) {
               uploadFile(productImageFiles[i], id);
            }
         } catch (err) {
            console.log(err);
         } finally {
            setLoading(false);
            toast.success("Creating Product Success...");
            console.log(data);
            router.refresh();
            router.push("/dashboard/products");
         }
      }
   };

   const handleCreateFeaturedImage = () => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
         const result = fileReader.result;
         setFeaturedImage(result);
      };
      fileReader.readAsDataURL(featuredImageFile[0]);
   };

   const handleCreateProductImages = () => {
      let productImages = [];
      for (let i = 0; i < productImageFiles.length; i++) {
         const file = productImageFiles[i];
         const fileReader = new FileReader();
         fileReader.onload = () => {
            const result = fileReader.result;
            productImages.push({ fileName: file.name, img: result });
            setProductImages([...productImages]);
         };
         fileReader.readAsDataURL(file);
      }
   };

   useEffect(() => {
      if (featuredImageFile.length >= 1) {
         handleCreateFeaturedImage();
      }
      if (productImageFiles) {
         handleCreateProductImages();
      }
   }, [featuredImageFile, productImageFiles]);

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
            <label>Short description</label>
            <textarea name="shortDescription" placeholder="Product description" rows={2} onChange={handleChangeEvent} />
            <label>Overview</label>
            <textarea name="overview" placeholder="Product overview" rows={6} onChange={handleChangeEvent} />
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
            <input type="file" className="file-input file-input-bordered w-full" onChange={(e) => setFeaturedImageFile(e.target.files)} />
         </section>
         <section className="space-y-3">
            <label>Product Images</label>
            <div className="flex gap-4">
               {productImages.map((item) => {
                  return <Image src={item.img} alt="featuredImage" width={120} height={120} className="object-cover rounded-lg" />;
               })}
            </div>
            <input
               multiple
               type="file"
               className="file-input file-input-bordered w-full"
               onChange={(e) => setProductImageFiles(e.target.files)}
            />
         </section>
         <section className="space-y-3">
            <label>Downloadable File</label>
            <input type="file" className="file-input file-input-bordered w-full" onChange={(e) => setDownloadableFile(e.target.files)} />
         </section>
         <button disabled={loading} onClick={handleSubmitCreateProduct}>
            Create Product
         </button>
      </main>
   );
};

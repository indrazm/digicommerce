import { API_URL } from "@/constants/apiUrl";
import { cookies } from "next/headers";
import { AllProducts } from "@/components/app/product/AllProducts";

async function getAllProductByUserId(userId) {
   const res = await fetch(`${API_URL}/product?userId=${userId}`);
   const data = res.json();
   return data;
}

export default async function Page() {
   const user = cookies().get("user_record").value;
   const userId = JSON.parse(user).id;
   const { data: productsData } = await getAllProductByUserId(userId);

   return (
      <main className="space-y-12">
         <div className="flex justify-between items-center ">
            <h3>All Products</h3>
            <button className="w-[200px] btn-primary">Create product</button>
         </div>
         <AllProducts productsData={productsData} />
      </main>
   );
}

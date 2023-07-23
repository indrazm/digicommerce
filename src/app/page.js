import { API_URL } from "@/constants/apiUrl";
import { Home } from "@/components/web/Home";

async function getAllProducts() {
   const res = await fetch(`${API_URL}/product`, {
      cache: "no-store",
   });
   const data = await res.json();
   return data;
}

export default async function Page() {
   const { data: productsData } = await getAllProducts();

   return <Home productsData={productsData} />;
}

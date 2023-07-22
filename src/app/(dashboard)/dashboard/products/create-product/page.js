import { CreateProduct } from "@/components/app/dashboard/CreateProduct";
import { API_URL } from "@/constants/apiUrl";

async function getCategories() {
   const res = await fetch(`${API_URL}/category`);
   const data = res.json();
   return data;
}

export default async function Page() {
   const { data: categoryData } = await getCategories();

   return <CreateProduct categoryData={categoryData} />;
}

import { ProductCard } from "@/components/app/product/ProductCard";
import { API_URL } from "@/constants/apiUrl";

export default async function Page({ params }) {
   const { productId } = params;

   return <main className="space-y-40">{productId}</main>;
}

import { API_URL } from "@/constants/apiUrl";
import { SingleProduct } from "@/components/web/SingleProduct";

async function getProductBySlug(slug) {
   const res = await fetch(`${API_URL}/product/${slug}`, {
      cache: "no-store",
   });
   const data = res.json();
   return data;
}

export default async function Page({ params }) {
   const { productSlug } = params;
   const { data } = await getProductBySlug(productSlug);

   return <SingleProduct item={data} />;
}

import { ProductCard } from "@/components/app/product/ProductCard";
import { API_URL } from "@/constants/apiUrl";

async function getAllProducts() {
   const res = await fetch(`${API_URL}/product`);
   const data = res.json();
   return data;
}
export default async function Page() {
   const { data: productsData } = await getAllProducts();

   return (
      <main className="space-y-40">
         <section className="text-center max-w-3xl m-auto">
            <h1>6,972 curated design resources to speed up your creative workflow.</h1>
            <h4>Join a growing family of 679,198 designers and makers from around the world.</h4>
         </section>
         <section className="grid grid-cols-3 gap-8">
            {productsData.map(({ id, name, price, images }) => {
               return <ProductCard id={id} name={name} price={price} image={images} />;
            })}
         </section>
      </main>
   );
}

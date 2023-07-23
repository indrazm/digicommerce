import { ProductCard } from "./ProductCard";

export const AllProducts = ({ productsData }) => {
   return (
      <div className="grid grid-cols-2 gap-12">
         {productsData.map((item) => {
            return <ProductCard key={item.id} id={item.id} name={item.name} price={item.price} image={item.images} />;
         })}
      </div>
   );
};

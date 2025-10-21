import ProductCard, { Product } from "../_components/ProductCard";

export const metadata = {
  title: "Women's Collection | Flet",
  description: "Shop trendy and stylish women's clothing from Flet.",
};

export default async function WomenPage() {
  const res = await fetch(
    "https://fakestoreapi.com/products/category/women's clothing"
  );
  const products: Product[] = await res.json();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Women’s Collection
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No products available right now.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

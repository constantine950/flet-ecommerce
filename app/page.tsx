import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export default async function Home() {
  const menRes = await fetch(
    "https://fakestoreapi.com/products/category/men's clothing"
  );
  const womenRes = await fetch(
    "https://fakestoreapi.com/products/category/women's clothing"
  );

  const [men, women]: [Product[], Product[]] = await Promise.all([
    menRes.json(),
    womenRes.json(),
  ]);

  const products: Product[] = [...men, ...women];

  return (
    <main className="px-6 lg:px-16 py-10 space-y-14">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight">
          Discover Your <span className="text-blue-600">Style</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Shop the latest trends in men’s and women’s fashion — quality pieces
          that define comfort and class.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition">
          Shop Now
        </button>
      </section>

      {/* Product Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Featured Collections
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block group bg-gray-50 rounded-lg hover:shadow-md transition p-4"
            >
              <div className="relative w-full h-56">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-lg font-semibold mt-3 text-gray-800">
                {product.title}
              </h3>
              <p className="text-blue-600 font-medium">${product.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

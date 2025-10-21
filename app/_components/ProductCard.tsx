import Link from "next/link";
import Image from "next/image";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block space-y-2 hover:shadow-md transition-shadow duration-200 p-2 rounded-lg"
    >
      {/* Image */}
      <div className="relative w-full h-64 bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
        />
      </div>

      {/* Title */}
      <h2 className="text-blue-600 hover:underline cursor-pointer text-sm font-medium line-clamp-2">
        {product.title}
      </h2>

      {/* Price */}
      <p className="text-gray-700 font-semibold">${product.price}</p>
    </Link>
  );
};

export default ProductCard;

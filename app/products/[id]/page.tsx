"use client";
import Image from "next/image";
import { useCart } from "@/app/_context/CartContext";
import { Product } from "../../_components/ProductCard";
import BackButton from "@/app/_components/BackButton";
import { useEffect, useState } from "react";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const { id } = await params;
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [params]);

  if (!product) return <p className="p-8 text-gray-600">Loading...</p>;

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative w-full h-96 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-500 text-sm capitalize">{product.category}</p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600">
            ${product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </main>
  );
}

"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center text-gray-600 hover:text-blue-600 font-medium transition"
    >
      ← Back to Shop
    </button>
  );
}

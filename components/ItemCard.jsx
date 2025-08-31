"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FadeCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center w-full h-full relative">
      {/* Image wrapper with Link */}
      <Link
        href={`/products/${product?.id}`}
        className="relative w-full h-80 cursor-pointer overflow-hidden rounded-2xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Front image */}
        <Image
          src={product?.cover1}
          alt="Front"
          fill
          className="object-contain transition-opacity duration-500 ease-in-out"
          style={{ opacity: hovered ? 0 : 1 }}
          priority
        />

        {/* Back image */}
        <Image
          src={product?.cover2}
          alt="Back"
          fill
          className="object-contain transition-opacity duration-500 ease-in-out"
          style={{ opacity: hovered ? 1 : 0 }}
        />
      </Link>

      {/* Text under image */}
      <p className="text-center text-xs lg:text-lg font-semibold text-gray-800">
        {product?.name}
      </p>
      <p className="text-gray-600 text-xs lg:text-base">${product?.price}</p>
    </div>
  );
}

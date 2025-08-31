"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ItemCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Image wrapper with fixed aspect ratio */}
      <Link
        href={`/products/${product?.id}`}
        className="relative w-full aspect-[2/3] cursor-pointer overflow-hidden rounded-2xl"
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

      {/* Text under image - always aligned */}
      <div className="flex flex-col items-center">
        <p className="text-center text-xs lg:text-lg font-semibold text-gray-800 -mt-10 lg:-mt-20 z-10">
          {product?.name}
        </p>
        <p className="text-gray-600 text-xs lg:text-base">
          ${product?.price}
        </p>
      </div>
    </div>
  );
}

'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: "400",
});

export default function ProductPageComp({ product }) {

  console.log(product);
  // Group variants by color
  const colors = Array.from(
    new Set(product.variants.map((v) => v.title.split(" / ")[0]))
  );

  // Map color => all variants for that color
  const variantsByColor = colors.reduce((acc, color) => {
    acc[color] = product.variants.filter(v => v.title.startsWith(color));
    return acc;
  }, {});

  // Map color => images associated with its variants
  const imagesByColor = colors.reduce((acc, color) => {
    const variantIds = variantsByColor[color].map(v => v.id);
    acc[color] = product.images.filter(img =>
      img.variant_ids.some(id => variantIds.includes(id))
    );
    return acc;
  }, {});

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [mainImage, setMainImage] = useState(imagesByColor[colors[0]][0]);

  // Sizes (placeholder, or could map from product.variants)
  const sizes = ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  // Quantity state
  const [quantity, setQuantity] = useState(1);

  // Update main image when color changes
  useEffect(() => {
    setMainImage(imagesByColor[selectedColor][0]);
  }, [selectedColor]);

  // Shared button styles (color + size)
  const OptionButton = ({ label, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`relative inline-block px-4 py-2 font-medium group 
        ${isSelected ? "cursor-default" : "cursor-pointer"}`}
    >
      {/* Shadow layer */}
      <span
        className={`absolute inset-0 w-full h-full transition duration-200 ease-out transform
        ${isSelected ? "translate-x-0 translate-y-0" : "translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"}
        bg-black`}
      ></span>

      {/* Border + main fill */}
      <span
        className={`absolute inset-0 w-full h-full border-2 border-black
        ${isSelected ? "bg-black" : "bg-white group-hover:bg-black"}`}
      ></span>

      {/* Text */}
      <span
        className={`relative
        ${isSelected ? "text-white" : "text-black group-hover:text-white"}`}
      >
        {label}
      </span>
    </button>
  );

  return (
    <>
    <div className={`flex p-8 gap-8 bg-white ${lato.className} min-h-screen`}>
      {/* Left column: main image */}
      <div className="flex-1 relative h-[80vh]">
        <Image
          src={mainImage.src}
          alt="Shirt image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right column */}
      <div className="flex-1 flex flex-col gap-4 pt-20">
        {/* Product name */}
        <h1 className="text-6xl font-bold">{product.title}</h1>

        {/* Price */}
        <p className="text-lg text-gray-800">
          ${(product.variants[0].price / 100).toFixed(2)}
        </p>

        {/* Color options */}
        <div className="flex gap-2 mt-12">
          {colors.map((color) => (
            <OptionButton
              key={color}
              label={color}
              isSelected={color === selectedColor}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>

        {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto">
  {imagesByColor[selectedColor].map((img, idx) => (
    <div
      key={idx}
      className={`relative w-24 h-24 cursor-pointer border-2 border-black transition-opacity
        ${mainImage?.src === img.src ? "opacity-60" : "hover:opacity-60"}`}
      onClick={() => setMainImage(img)}
    >
      <Image
        src={img.src}
        alt={`Variant ${idx}`}
        fill
        className="object-cover"
      />
    </div>
  ))}
</div>



        {/* Size options */}
        <div className="flex gap-2 mt-6">
          {sizes.map((size) => (
            <OptionButton
              key={size}
              label={size}
              isSelected={size === selectedSize}
              onClick={() => setSelectedSize(size)}
            />
          ))}
        </div>

        {/* Quantity selector */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white cursor-pointer"
          >
            -
          </button>
          <span className="text-lg cursor-default">{quantity}</span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white cursor-pointer"
          >
            +
          </button>
        </div>


{/* Add to cart button */}
<button className="mt-6 px-6 py-3 border-2 border-black  bg-black text-white font-bold hover:bg-white hover:text-black transition-colors cursor-pointer">
  Add to Cart
</button>



        {/* Description dropdown */}
        <details className="mt-4">
          <summary className="cursor-pointer font-medium">Description</summary>
          <p className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: product.description }}></p>
        </details>
      </div>
    </div>
    </>
    
  );
}

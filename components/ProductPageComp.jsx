'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { Lato } from "next/font/google";
import { useCart } from "./CartContext";

const lato = Lato({ subsets: ["latin"], weight: "400" });

export default function ProductPageComp({ product }) {

  const { addToCart } = useCart()

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
  const [selectedSize, setSelectedSize] = useState("M");
  const [mainImage, setMainImage] = useState(imagesByColor[colors[0]][0]);
  const [hoverImage, setHoverImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Find the correct variant based on selected color and size
    const variant = product.variants.find(
    v => v.title.startsWith(selectedColor) && v.title.endsWith(selectedSize)
  );

  if (!variant) return alert("Variant unavailable");

    addToCart({
      productId: product.id,
      title: product.title,
      variantId: variant.id,
      color: selectedColor,
      size: selectedSize,
      quantity,
      price: variant.price,
      image: mainImage.src,
    });
  };

  // Find selected variant
  const selectedVariant = variantsByColor[selectedColor].find(
    v => v.title.endsWith(selectedSize)
  );

  // Update main image when color changes
  useEffect(() => {
    setMainImage(imagesByColor[selectedColor][0]);
    setHoverImage(null);
  }, [selectedColor]);

  const sizes = product.options.find(opt => opt.type === "size")?.values.map(s => s.title) || ["S","M","L","XL"];

  const OptionButton = ({ label, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`relative inline-block px-4 py-2 font-medium group 
        ${isSelected ? "cursor-default" : "cursor-pointer"}`}
    >
      <span
        className={`absolute inset-0 w-full h-full transition duration-200 ease-out transform
        ${isSelected ? "translate-x-0 translate-y-0" : "translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"} bg-black`}
      ></span>
      <span
        className={`absolute inset-0 w-full h-full border-2 border-black
        ${isSelected ? "bg-black" : "bg-white group-hover:bg-black"}`}
      ></span>
      <span className={`relative ${isSelected ? "text-white" : "text-black group-hover:text-white"}`}>
        {label}
      </span>
    </button>
  );

  // Build cart item to send to Printify / Stripe
  const cartItem = selectedVariant ? {
    id: selectedVariant.id,
    title: selectedVariant.title,
    price: selectedVariant.price,
    cost: selectedVariant.cost,
    quantity,
    image: mainImage.src,
  } : null;

  return (
    <div className={`flex flex-col lg:flex-row gap-8 bg-white ${lato.className} min-h-screen`}>
      {/* Left column */}
      <div className="flex-1 h-screen flex flex-col items-center justify-center">
        <div className="relative p-8 w-full h-[65vh]">
          <Image
            src={(hoverImage || mainImage).src}
            alt="Shirt image"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex w-full gap-4 px-12">
          {imagesByColor[selectedColor].map((img, idx) => (
            <div
              key={idx}
              className={`relative flex-1 aspect-square cursor-pointer transition-opacity
                ${mainImage?.src === img.src ? "opacity-60" : "hover:opacity-60"}`}
              onMouseEnter={() => setHoverImage(img)}
              onMouseLeave={() => setHoverImage(null)}
              onClick={() => setMainImage(img)}
            >
              <Image
                src={img.src}
                alt={`Variant ${idx}`}
                fill
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div className="flex-1 flex flex-col gap-4 py-12 lg:py-20 px-8 lg:bg-gray-100">
        <hr className="border-t-2 border-black mb-2 lg:hidden" />
        <h1 className="text-4xl lg:text-6xl font-extrabold">{product.title}</h1>
        <p className="text-lg text-gray-800">
          ${(selectedVariant?.price / 100).toFixed(2)}
        </p>
        <hr className="border-t-2 border-black mx-4 lg:hidden" />

        <p className="text-gray-700">Size: {selectedSize}</p>
        <div className="flex flex-wrap gap-2 mt-2 lg:mt-6">
          {sizes.map(size => (
            <OptionButton
              key={size}
              label={size}
              isSelected={size === selectedSize}
              onClick={() => setSelectedSize(size)}
            />
          ))}
        </div>

        <div className="flex gap-2 mt-6 lg:mt-12 flex-wrap">
          {colors.map(color => (
            <OptionButton
              key={color}
              label={color}
              isSelected={color === selectedColor}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white cursor-pointer"
          >-</button>
          <span className="text-lg cursor-default">{quantity}</span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white cursor-pointer"
          >+</button>
        </div>

        {/* Add to cart */}
        <button
          className="mt-6 mx-8 py-3 border-2 border-black bg-black text-white font-bold hover:bg-white hover:text-black transition-colors cursor-pointer"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <details className="mt-4">
          <summary className="cursor-pointer font-medium">Description</summary>
          <p
            className="mt-2 text-gray-600"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></p>
        </details>
      </div>
    </div>
  );
}

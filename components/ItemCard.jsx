"use client";
import { useState } from "react";
import Image from "next/image";

export default function FadeCard({ product }) {
  const [hovered, setHovered] = useState(false);

  const Cover2 =
    "https://images-api.printify.com/mockup/6896531d07d2b55d81039730/12100/92571/more-of-me-poodle-tee.jpg?camera_label=back";
  const Cover1 =
    "https://images-api.printify.com/mockup/6896531d07d2b55d81039730/12100/92570/more-of-me-poodle-tee.jpg?camera_label=front";

  return (
    <div
      className="relative w-full h-full cursor-pointer overflow-hidden rounded-2xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Back image */}
      <Image
        src={Cover1}
        alt="Front"
        fill
        className="object-contain transition-opacity duration-500 ease-in-out"
        style={{ opacity: hovered ? 0 : 1 }}
        priority
      />

      {/* Front image */}
      <Image
        src={Cover2}
        alt="Back"
        fill
        className="object-contain transition-opacity duration-500 ease-in-out"
        style={{ opacity: hovered ? 1 : 0 }}
      />
    </div>
  );
}

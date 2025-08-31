import Image from "next/image";
import FirstImage from "../images/FirstImage.jpeg";
import SecondImage from "../images/SecondImage.jpeg";
import ThirdImage from "../images/ThirdImage.jpeg";
import Mobile2 from "../images/Mobile2.JPG";
import Link from "next/link";

export default function ImageRow() {
  return (
    <>
        <div className="w-full h-[80vh] hidden lg:flex">
      {/* Image 1 */}
      <div className="relative flex-1">
        <Image
          src={FirstImage}
          alt="First"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Image 2 */}
      <div className="relative flex-1">
        <Image
          src={SecondImage}
          alt="Second"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Image 3 */}
      <div className="relative flex-1">
        <Image
          src={ThirdImage}
          alt="Third"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>

    <div className="relative w-full h-[35vh]">
      <Image
        src={Mobile2}
        alt="Mobile 2"
        fill
        className="object-cover"
        priority
      />    

      <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-amber-950 text-lg font-bold px-4 py-2 rounded">
        <Link href="/shop">
            SHOP NOW
        </Link>
      </button>

    </div>
    </>
    
  );
}

// div className="relative h-screen w-screen lg:hidden">
//       <Image 
//         src={MobileView}
//         alt="Mobile View"
//         fill
//         className="object-cover"
//         priority
//       />
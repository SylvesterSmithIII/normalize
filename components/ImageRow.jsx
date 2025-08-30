import Image from "next/image";
import FirstImage from "../images/FirstImage.jpeg";
import SecondImage from "../images/SecondImage.jpeg";
import ThirdImage from "../images/ThirdImage.jpeg";

export default function ImageRow() {
  return (
    <div className="w-full h-[80vh] flex">
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
  );
}

import Nav from "@/components/Nav";
import { Alex_Brush } from "next/font/google";
import HeroPhoto from "../images/HeroPhoto.JPG";
import Image from "next/image";
import FirstRow from "@/components/FirstRow";
import CartDrawer from "@/components/CartDrawer";

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400", // Alex Brush only has 400
});

//home
//shop
//about


export default function Home() {



  return (
    <div>
      <header className="relative w-screen h-screen flex flex-col">
        {/* Background Image */}
        <Image
          src={HeroPhoto}
          alt="Hero background"
          fill
          className="object-cover z-0"
          priority
        />

        {/* All content above background */}
        <div className="relative z-10 flex flex-col flex-1">
          
          <div className="flex-1 flex flex-col justify-center items-center gap-4">
            <div className={`flex flex-col items-center text-yellow-300 ${alexBrush.className} text-6xl`}>
              <h4>Let&apos;s Celebrate</h4>
              <h4>Our Differences</h4>
            </div>

            <div className="flex flex-col items-center text-amber-950 font-bold text-8xl ">
              <h1>BE WHO YOU</h1>
              <h1>ARE. SAY HOW</h1>
              <h1>YOU FEEL.</h1>

            </div>

            <div className="mt-10">
              <button className="flex rounded-full bg-white text-amber-950 font-bold px-12 py-2">
                BROWSE COLLECTION
              </button>
            </div>
          </div>

        </div>
      </header>
      
      <FirstRow />
    </div>
  );
}

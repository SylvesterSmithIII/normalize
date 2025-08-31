import { Alex_Brush } from "next/font/google";
import HeroPhoto from "../images/HeroPhoto.JPG";
import Image from "next/image";
import FirstRow from "@/components/FirstRow";
import CartDrawer from "@/components/CartDrawer";
import Link from 'next/link'
import MobileView from "../images/MobileView.jpeg"

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
      <header className="relative w-screen h-[50vh] lg:h-screen flex flex-col">
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
          
          <div className="flex-1 flex flex-col justify-end pb-8 lg:pb-0 lg:justify-center items-center gap-4">

            <div className={`flex flex-col items-center text-yellow-300 ${alexBrush.className} text-3xl lg:text-6xl`}>
              <h4>Let&apos;s Celebrate <span className="lg:hidden">Our Differences</span> </h4>
              <h4 className="hidden lg:block">Our Differences</h4>
            </div>

            <div className="flex flex-col items-center text-amber-950 font-bold text-4xl lg:text-8xl ">
              <h1>BE WHO YOU <span className="lg:hidden">ARE.</span></h1>
              <h1><span className="hidden lg:block">ARE.</span> SAY HOW <span className="lg:hidden">YOU FEEL.</span></h1>
              <h1 className="hidden lg:block">YOU FEEL.</h1>

            </div>

            <div className="mt-10 hidden lg:block">
              <Link href="/shop">
                <button className="flex rounded-full bg-white text-amber-950 font-bold px-12 py-2 cursor-pointer ">
                  BROWSE COLLECTION
                </button>
              </Link>
            </div>
          </div>

        </div>
      </header>

      <div className="lg:hidden h-8" />

    <div className="relative h-screen w-screen lg:hidden">
      <Image 
        src={MobileView}
        alt="Mobile View"
        fill
        className="object-cover"
        priority
      />

      <button className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white text-amber-950 text-lg font-bold px-4 py-2 rounded">
        <Link href="/shop">
          SHOP NOW
        </Link>
      </button>


    </div>

      
      <FirstRow />
    </div>
  );
}

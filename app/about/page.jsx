import Image from "next/image"
import AboutPage from "../../images/AboutPage.jpeg"
import { Alex_Brush } from "next/font/google"
import Tape from "../../images/Tape.PNG"
import About1 from "../../images/About1.jpeg"
import About2 from "../../images/About2.jpeg"
import About3 from "../../images/About3.jpeg"
import Insta from "../../images/Insta.PNG"
import TikTok from "../../images/TikTok.PNG"
import Link from "next/link"


const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400", // Alex Brush only has 400
});

export default function About() {
    return (

        <>
            <header className="relative w-screen h-screen flex flex-col">
                {/* Background Image */}
                <Image
                src={AboutPage}
                alt="About background"
                fill
                className="object-cover z-0"
                priority
                />

                {/* All content above background */}
                <div className="relative z-10 flex flex-col flex-1">
                
                <div className="flex-1 flex flex-col justify-end p-20 items-center gap-8">
                    

                    <div className="flex flex-col items-center text-amber-950 font-bold text-9xl ">
                    <h1>OUR STORY</h1>
                    <h1>ONE MOVEMENT</h1>
                    </div>

                    <div className={`flex flex-col items-center text-yellow-300 ${alexBrush.className} text-6xl`}>
                    <h4>Building A Better World</h4>
                    </div>

                </div>

                </div>
            </header>

            <div className="h-[80vh] flex flex-col justify-between items-center p-12 bg-white">

                <h1 className="text-7xl text-amber-300 font-bold">OUR STORY</h1>
                
                <div className="flex flex-col text-center items-center text-2xl gap-2">
                    <p>Let's Normalize started as a simple idea: what if we made it easier to talk about the things everyone feels, but nobody says out</p>
                    <p>loud? From daily struggles to deep emotions, we believe that nothing about being human should feel shamful or hidden.</p>
                    <p>What began as art and designs on T-shirts grew into a movement... creating clothing, content, and community spaces where</p>
                    <p>people feel seen, safe, and undertood.</p>
                </div>
                


                <h1 className="text-7xl text-amber-300 font-bold">MISSION STATEMENT</h1>

                <div className="flex flex-col text-center items-center text-2xl gap-2">
                    <p>Our mission is to break the stigma around real feelings and real conversations. We're here to normalize the unspoken, spark</p>
                    <p>empathy, and remind people that they're not alone. Through meaningful designs and an honest community, we're building a</p>
                    <p>brand that's more than clothes... it's a safe space you can wear</p>

                </div>


            </div>

           <div
  className="h-[80vh] flex items-center justify-center gap-8 bg-[#FFF7E9] px-8"
  style={{
    backgroundImage: `
      repeating-linear-gradient(
        to right,
        #000 0px,
        #000 1px,
        transparent 1px,
        transparent 7px,
        #000 7px,
        #000 8px,
        transparent 8px,
        transparent 100px
      )
    `
  }}
>
  {/* 1st Image */}
  <div className="relative w-1/4 max-w-sm">
    <Image
      src={Tape}
      alt="Tape"
      className="absolute -top-15 left-1/2 -translate-x-1/2 w-32 rotate-[-8deg] z-10"
    />
    <div className="bg-white p-3 pb-6 shadow-xl rounded-sm rotate-3">
      <Image
        src={About1}
        alt="About 1"
        className="w-full h-auto"
      />
    </div>
  </div>

  {/* 2nd Image */}
  <div className="relative w-1/4 max-w-sm">
    <Image
      src={Tape}
      alt="Tape"
      className="absolute -top-15 left-1/2 -translate-x-1/2 w-32 rotate-[5deg] z-10"
    />
    <div className="bg-white p-3 pb-6 shadow-xl rounded-sm -rotate-2">
      <Image
        src={About2}
        alt="About 2"
        className="w-full h-auto"
      />
    </div>
  </div>

  {/* 3rd Image */}
  <div className="relative w-1/4 max-w-sm">
    <Image
      src={Tape}
      alt="Tape"
      className="absolute -top-15 left-1/2 -translate-x-1/2 w-32 rotate-[2deg] z-10"
    />
    <div className="bg-white p-3 pb-6 shadow-xl rounded-sm rotate-1">
      <Image
        src={About3}
        alt="About 3"
        className="w-full h-auto"
      />
    </div>
  </div>
</div>

        <div className="h-[20vh] flex flex-col justify-center items-center p-6 bg-white ">

            <h1 className={`${alexBrush.className} text-6xl text-yellow-300 scale-x-130`}>What We Stand For</h1>

            <div className="flex text-6xl gap-12 text-amber-950 font-bold">
                <p>COMMUNITY</p>
                <p>&sdot;</p>
                <p>HOPE</p>
                <p>&sdot;</p>
                <p>INCLUSIVITY</p>
            </div>

        </div>

        <div className="h-[10vh] bg-amber-950 flex justify-center items-center gap-12 p-4">

            <Link href="https://www.tiktok.com/@letsnormalize.org" className="h-12 w-12">
                <Image
                src={TikTok}
                alt="TikTok"
                className="h-12"
            />
            </Link>
            

            <Link href="https://www.instagram.com/letsnormalizenyc?igsh=MXVzYjE3NGgyOHdtdg%3D%3D&utm_source=qr" className="h-12 w-12">
                <Image
                    src={Insta}
                    alt="Instagram"
                    className="h-12"
                />
            </Link>

        </div>


        </>
         
    )
}
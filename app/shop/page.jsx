import AboutPage from '../../images/AboutPage.jpeg'
import Image from 'next/image'
import Link from 'next/link'
import ShirtsRow1 from '@/components/ShirtsRow1'
import { Alex_Brush } from 'next/font/google'

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: '400',
})

    const allTshirts = [
      {
        cover1: "https://images-api.printify.com/mockup/689641b6da39ea6b4a025c44/11986/92570/my-own-muse-cheetah-tee.jpg?camera_label=front",
        cover2: "https://images-api.printify.com/mockup/689641b6da39ea6b4a025c44/11986/92571/my-own-muse-cheetah-tee.jpg?camera_label=back",
        name: "My Own Muse Cheetah Tee",
        price: "20.00",
        id: "689641b6da39ea6b4a025c44"
      },
      {
        cover1: "https://images-api.printify.com/mockup/6896531d07d2b55d81039730/12100/92570/more-of-me-poodle-tee.jpg?camera_label=front",
        cover2: "https://images-api.printify.com/mockup/6896531d07d2b55d81039730/12100/92571/more-of-me-poodle-tee.jpg?camera_label=back",
        name: "More of Me Poodle Tee",
        price: "20.00",
        id: "6896531d07d2b55d81039730"
      },
      {
        cover1: "https://images-api.printify.com/mockup/689633143465ef8d7103a608/12034/92570/choose-to-be-kind-teddy-tee.jpg?camera_label=front",
        cover2: "https://images-api.printify.com/mockup/689633143465ef8d7103a608/12034/92571/choose-to-be-kind-teddy-tee.jpg?camera_label=back",
        name: "Choose To Be Kind Teddy Tee",
        price: "20.00",
        id: "689633143465ef8d7103a608"
      },
      {
        cover1: "https://images-api.printify.com/mockup/6896294b3465ef8d7103a3b3/11974/92570/a-better-world-teddy-tee.jpg?camera_label=front",
        cover2: "https://images-api.printify.com/mockup/6896294b3465ef8d7103a3b3/11974/92571/a-better-world-teddy-tee.jpg?camera_label=back",
        name: "A Better World Teddy Tee",
        price: "20.00",
        id: "6896294b3465ef8d7103a3b3"
      },
      {
        cover1: "https://images-api.printify.com/mockup/6894f93110430a23e7100ef4/12100/92570/red-bra-tee.jpg?camera_label=front",
        cover2: "https://images-api.printify.com/mockup/6894f93110430a23e7100ef4/12100/92571/red-bra-tee.jpg?camera_label=back",
        name: "Red Bra Tee",
        price: "20.00",
        id: "6894f93110430a23e7100ef4"
      },
      {
        cover1: "https://images-api.printify.com/mockup/68951c08494f5a8a9a0dda74/12100/92570/new-york-flower-tee.jpg?camera_label=front",
        cover2: "https://images-api.printify.com/mockup/68951c08494f5a8a9a0dda74/12100/92571/new-york-flower-tee.jpg?camera_label=back",
        name: "New York Flower Tee",
        price: "20.00",
        id: "68951c08494f5a8a9a0dda74"
      },
      {
        cover1: "https://images-api.printify.com/mockup/68952214a545d9b6950a4022/12124/92570/i-love-who-i-am-tee.jpg?camera_label=front",
        cover2: "https://images-api.printify.com/mockup/68952214a545d9b6950a4022/12124/92571/i-love-who-i-am-tee.jpg?camera_label=back",
        name: "I Love Who I Am Tee",
        price: "20.00",
        id: "68952214a545d9b6950a4022"
      },
      {
        cover1: "https://images-api.printify.com/mockup/6894f9fb8a6d7e74790c1fb8/11980/92570/choose-to-be-kind-butterfly-tee.jpg?camera_label=front",
        cover2: "https://images-api.printify.com/mockup/6894f9fb8a6d7e74790c1fb8/11980/92571/choose-to-be-kind-butterfly-tee.jpg?camera_label=back",
        name: "Choose To Be Kind Butterfly Tee",
        price: "20.00",
        id: "6894f9fb8a6d7e74790c1fb8"
      },
      {
        cover1: "https://images-api.printify.com/mockup/68952cdfc346375a490ce9a2/11986/92570/always-day-dreamin-tee.jpg?camera_label=front",
        cover2: "https://images-api.printify.com/mockup/68952cdfc346375a490ce9a2/11986/92571/always-day-dreamin-tee.jpg?camera_label=back",
        name: "Always Day Dreamin’ Tee",
        price: "20.00",
        id: "68952cdfc346375a490ce9a2"
      },
      {
        cover1: "https://images-api.printify.com/mockup/6895188da4c8e9cc5e0cfd00/12100/92570/red-corset-tee.jpg?camera_label=front",
        cover2: "https://images-api.printify.com/mockup/6895188da4c8e9cc5e0cfd00/12100/92571/red-corset-tee.jpg?camera_label=back",
        name: "Red Corset Tee",
        price: "20.00",
        id: "6895188da4c8e9cc5e0cfd00"
      },
     
    ]

export default function Page () {
    return (
        <>

         <header className="relative w-screen h-[50vh] lg:h-screen flex flex-col">
        {/* Background Image */}
        <Image
          src={AboutPage}
          alt="Hero background"
          fill
          className="object-cover z-0"
          priority
        />

        {/* All content above background */}
        <div className="relative z-10 flex flex-col flex-1">
          
          <div className="flex-1 flex flex-col mt-12 lg:mt-0 justify-center items-center gap-4">

            <div className={`flex flex-col items-center text-yellow-300 ${alexBrush.className} text-3xl lg:text-6xl`}>
              <h4>Made For You</h4>
            </div>

            <div className="flex flex-col items-center text-amber-950 font-bold text-4xl lg:text-8xl ">
              <h1>WEAR WHAT YOU</h1>
              <h1>BELIEVE IN</h1>
            </div>

          </div>

        </div>
      </header>

      <ShirtsRow1 tShirts={allTshirts} collection={""} className="bg-white h-auto" style={{}} />
        
        
        </>
    )
}
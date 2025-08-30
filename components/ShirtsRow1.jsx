import ItemCard from './ItemCard'
import { Alex_Brush } from "next/font/google";

const alexBrush = Alex_Brush({
    subsets: ["latin"],
    weight: ["400"],
})


export default function ShirtsRow1 ({ tShirts, collection, style, className }) {



    return (
        <div className={`flex flex-col h-[70vh] items-center justify-between pt-8 pb-12 ${className}`} style={style}>

            <h1 className={`${alexBrush.className} text-amber-950 text-6xl`}> {collection} </h1>

            <div className="flex justify-evenly w-full gap-2 place-items-stretch px-4">

                {tShirts.map((product) => (
                    <div key={product.id} className="aspect-[2/3] w-[20vw]">
                        <ItemCard key={product.id} product={product} />
                    </div>
                ))}

            </div>
        </div>
    )
}
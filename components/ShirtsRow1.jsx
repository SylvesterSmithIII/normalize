import ItemCard from './ItemCard'
import { Alex_Brush } from "next/font/google";

const alexBrush = Alex_Brush({
    subsets: ["latin"],
    weight: ["400"],
})

export default function ShirtsRow1({ tShirts, collection, style, className }) {
  return (
    <div className={`flex flex-col h-auto items-center justify-between pt-8 relative pb-12 ${className}`} style={style}>
      <h1 className={`${alexBrush.className} -z-10 text-4xl  lg:text-6xl`}>
        {collection}
      </h1>
      <h1 className={`${alexBrush.className} text-amber-950 text-4xl absolute top-12 lg:top-16 lg:text-6xl`}>
        {collection}
      </h1>

      <div className="flex flex-1 items-start flex-wrap lg:flex-nowrap justify-center lg:justify-evenly w-full gap-4 px-4">
        {tShirts.map((product) => (
          <div
            key={product.id}
            className="w-[40vw] sm:w-[30vw] lg:w-[20vw]"
          >
            <ItemCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

import ItemCard from './ItemCard'

export default function SecondRow ({ tShirts }) {
    return (
         <div
  className="flex h-[90vh] bg-[#FFF7E9] items-center justify-center"
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
  <div
    className="grid w-full max-w-[1400px] gap-2 place-items-stretch px-4"
    style={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    }}
  >
    {tShirts.map((product) => (
      <div className="w-full aspect-[2/3]">
        <ItemCard key={product.id} product={product} />
      </div>
    ))}
  </div>
</div>
    )
}
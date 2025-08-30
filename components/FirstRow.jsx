import Image from "next/image";
import Cover2 from "../images/Cover2.JPG";
import ItemCard from "./ItemCard";
import { getAllProducts } from "@/libs/getProducst";
import Link from "next/link";



export default async function FirstRow() {

        const products = await getAllProducts();

    const tShirts = products.map((product) => {

      product.link = `/product/${product.id}`

      const price = product.variants[0].price.toString()

      product.price = price.slice(0, -2) + "." + price.slice(-2)

      return product
    });

    return (
        // <div className="flex flex-col items-center justify-center h-[75vh] ">
        //     {/* <h1 >SHOP FEATURED PRODUCTS</h1> */}
        //     <div className="grid grid-cols-4 gap-1 w-full  h- p-4">
        //         {tShirts.map((product) => (
        //             <ItemCard key={product.id} product={product} />
        //         ))}
        //     </div>
        // </div>
    <>
    
   
        <div className=" bg-white">
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







        </div>
        <div className="py-8">
          <h1 className="text-4xl font-bold text-center">NORMALIZE YOU</h1>
      </div>
        <div className="bg-white">
            <div className="flex h-[90vh]">
                <div className="flex-1">
                    {/* <Link href={`/products/${products[0].id}`} className="block w-full h-full"> */}
      <div className="rounded shadow flex flex-col items-center h-full cursor-pointer hover:shadow-lg transition-shadow">
                    {/* <Link href={`/products/${products[0].id}`} className="block w-full h-full"> */}

        <div className="flex-[95%] relative w-full">
          <Image
            src={"https://images-api.printify.com/mockup/689641b6da39ea6b4a025c44/12100/92570/unisex-heavy-cotton-tee.jpg?camera_label=front"}
            alt={"test"}
            fill
            className="object-cover z-0"
            priority
          />
          
        </div>
                    {/* </Link> */}
        <div className="flex w-full flex-[5%] justify-between items-center mt-2 py-0.5 bg-emerald-800 text-white px-12">

            <p>Title</p>
            <p>Price</p>

           </div>       


      </div>
    {/* </Link> */}
                </div>
                <div className="flex-1 relative">
                    <Image
                                src={Cover2}
                                alt={"test"}
                                fill
                                className="object-cover z-0"
                                priority
                              />
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 text-white text-4xl">
                                  <h2 className="text-white ">NORMALIZE YOU</h2>
                                  <p className="text-white text-center">YOU!!</p>
                              </div>
                </div>
                
            </div>
        </div>

<div className="flex flex-col items-center justify-center h-[75vh] ">
{/* <h1 >SHOP FEATURED PRODUCTS</h1> */}
<div className="grid grid-cols-4 gap-1 w-full h-[70vh] p-4">
{tShirts.map((product) => (
   <ItemCard key={product.id} product={product} />
 ))}
 </div>
</div>
    </>
    );
};
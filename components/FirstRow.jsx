import Image from "next/image";
import Cover2 from "../images/Cover2.JPG";
import ItemCard from "./ItemCard";
import { getAllProducts } from "@/libs/getProducst";
import Link from "next/link";
import Row2 from "../images/Row2.PNG";



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
       
        <div className="bg-white">
            <div className="flex h-[90vh]">
                <Image src={Row2} alt="Row2" className="object-cover w-full h-full"/>
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
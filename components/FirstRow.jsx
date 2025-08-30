import Image from "next/image";
import Cover2 from "../images/Cover2.JPG";
import ItemCard from "./ItemCard";
import { getAllProducts } from "@/libs/getProducst";
import Link from "next/link";
import Row2 from "../images/Row2.PNG";
import ShirtsRow1 from "./ShirtsRow1";



export default async function FirstRow() {

        const products = await getAllProducts();

        console.log(products);

    const tShirts = products.map((product) => {

      product.link = `/product/${product.id}`

      const price = product.variants[0].price.toString()

      product.price = price.slice(0, -2) + "." + price.slice(-2)

      return product
    });

    const firstRowTShirts = [
      {
        cover1: "https://images-api.printify.com/mockup/689641b6da39ea6b4a025c44/12100/92570/my-own-muse-cheetah-tee.jpg?camera_label=front",
        cover2: "https://images-api.printify.com/mockup/689641b6da39ea6b4a025c44/12100/92571/my-own-muse-cheetah-tee.jpg?camera_label=back",
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
    ]

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


        <ShirtsRow1 tShirts={firstRowTShirts} collection={"The Fur Collection"} />





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
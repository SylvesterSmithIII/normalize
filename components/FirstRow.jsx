import Image from "next/image";
import Cover2 from "../images/Cover2.JPG";
import ItemCard from "./ItemCard";
import { getAllProducts } from "@/libs/getProducst";
import Link from "next/link";
import Row2 from "../images/Row2.PNG";
import ShirtsRow1 from "./ShirtsRow1";
import ImageRow from "./ImageRow";
import BottomImage from "../images/BottomImage.jpeg";



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
    ]

    const secondRowTShirts = [
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
        cover1: "https://images-api.printify.com/mockup/6894f9fb8a6d7e74790c1fb8/12100/92570/choose-to-be-kind-butterfly-tee.jpg?camera_label=front",
        cover2: "https://images-api.printify.com/mockup/6894f9fb8a6d7e74790c1fb8/12100/92571/choose-to-be-kind-butterfly-tee.jpg?camera_label=back",
        name: "Choose To Be Kind Butterfly Tee",
        price: "20.00",
        id: "6894f9fb8a6d7e74790c1fb8"
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


        <ShirtsRow1 tShirts={firstRowTShirts} collection={"The Fur Collection"} className="bg-white" style={{}} />





        </div>
       
        <ImageRow />

        <ShirtsRow1 tShirts={secondRowTShirts} collection={"The Self Love Club"} className="bg-[#FFF7E9]" style={{
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
        }} />

         <div className="w-full h-[80vh] flex">

        

              <div className="relative flex-1">
                <Image
                  src={BottomImage}
                  alt="Bottom Image"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>


    </>
    );
};
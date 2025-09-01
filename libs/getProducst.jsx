import axios from "axios";
// import Product from "@/models/product";
// import connectMongoDB from "./mongodb";
// import { NextResponse } from "next/server";

// interface PrintifyProduct {
//     id: string,
//     title: string,
//     variants: any[],
//     images: any[]
// }

// export async function getProducts() {
//     const response = await axios.get(`https://api.printify.com/v1/shops/${process.env.UNITY_SHOP_ID!}/products.json`, {
//         headers: {
//             'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`
//         }
//     })

//     const products = response.data.data

//     await connectMongoDB()

//     const currentProducts = await Product.find({}, 'printifyId')
//     const currentProductIds = currentProducts.map(product => product.printifyId)

//     const newProducts = products.filter((product: PrintifyProduct) => !currentProductIds.includes(product.id)).map((product: PrintifyProduct) => {
//         return {
//             id: product.id,
//             title: product.title,
//             variants: product.variants,
//             images: product.images
//         }
//     })

//     return newProducts
// }

export async function getAllProducts() {
    const response = await axios.get(`https://api.printify.com/v1/shops/${process.env.UNITY_SHOP_ID}/products.json?limit=4`, {
        headers: {
            'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`
        }
    })

    const products = response.data.data

    const productsWithPictures = products.filter((product) => product.images && product.images.length > 0);

    // {
            // id: string;
            //title: string;
            //description: string;
            //variants: {
                //id: number;
                //sku: string;
                //price: number;
                //title: string;
                //is_enabled: boolean
                //is_available: boolean
            //}
            // need to make sure "is_default" is first kinda
            //images: {
                //src: string;
                //position: string;
            //}
    //}

    // filter variants that dont have "is_enabled" && "is_available"

    const filteredProducts = productsWithPictures.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        variants: product.variants.filter((variant) => variant.is_enabled && variant.is_available),
        images: product.images.slice(0, 8)
    }));

    return filteredProducts
}



export async function getOneProduct(id) {
    const response = await axios.get(`https://api.printify.com/v1/shops/${process.env.UNITY_SHOP_ID}/products/${id}.json`, {
        headers: {
            'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`
        }
    })

    const product = response.data

    product.variants = product.variants.filter((variant) => variant.is_enabled && variant.is_available)

    delete product.tags

    return product
}
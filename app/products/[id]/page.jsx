import { getOneProduct } from "@/libs/getProducst";
import ProductPageComp from "@/components/ProductPageComp";

export default async function ProductPage({ params }) {
  const { id } = params;

  const product = await getOneProduct(id);

  return (
    <div className="">
      <ProductPageComp product={product} />
    </div>
  );
}

import getBillboard from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/Billboard";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/container";

export const revalidate = 0;

export default async function Home() {

  const data = await getBillboard("c23a62a1-a1e9-4758-8801-268ba79da2fa");
  const products = await getProducts({isFeatured:true});

  return (
    <Container >
      <div className="space-y-10 pb-10">
        <Billboard data={data}/>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products}/>
        </div> 
      </div>
    </Container>
  )
}

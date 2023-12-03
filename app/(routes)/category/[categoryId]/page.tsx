import getCategory from '@/actions/get-category';
import getColors from '@/actions/get-colors';
import getProducts from '@/actions/get-products';
import getSizes from '@/actions/get-sizes';
import Billboard from '@/components/Billboard';
import NoResults from '@/components/ui/NoResult';
import ProductCard from '@/components/ui/ProductCard';
import Container from '@/components/ui/container';
import React from 'react'
import Filter from './_components/Filter';
import MobileFilters from './_components/mobile-filter';

export const revalidate = 0;

interface CategoryIdPageProps {
    params:{
        categoryId:string,
    },
    searchParams:{
        colorId:string,
        sizeId:string,
    }
};

const CategoryIdPage = async({params,searchParams}:CategoryIdPageProps) => {

    const products = await getProducts({
        categoryId:params.categoryId,
        colorId:searchParams.colorId,
        sizeId:searchParams.sizeId,
    })

    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(params.categoryId);

  return (
    <div className="bg-white">
    <Container>
      <Billboard 
        data={category.billboard}
      />
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <MobileFilters sizes={sizes} colors={colors} />
          <div className="hidden lg:block">
            <Filter
              valueKey="sizeId" 
              name="Sizes" 
              data={sizes}
            />
            <Filter 
              valueKey="colorId" 
              name="Colors" 
              data={colors}
            />
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {products.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
  )
}

export default CategoryIdPage
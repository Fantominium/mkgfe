import { Suspense } from 'react'
import ProductsList from '@/app/Components/ProductComponents/ProductsList'
import FilterSort from '@/app/Components/ProductComponents/FilterSort'
import BackToTop from '@/app/Components/ProductComponents/BackToTop'
import { getProducts } from '@/app/Constants/ProductConstants/ProductActions'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const initialProducts = await getProducts(searchParams)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Products</h1>
      <FilterSort />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsList initialProducts={initialProducts} />
      </Suspense>
      <BackToTop />
    </div>
  )
}


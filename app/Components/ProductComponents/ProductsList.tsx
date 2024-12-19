'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSearchParams } from 'next/navigation'
import ProductCard from './ProductCard'
import { getProducts } from '@/app/Constants/ProductConstants/ProductActions'
import { Product } from '@/app/Constants/ProductConstants/ProductTypes'

export default function ProductsList({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (inView) {
      loadMoreProducts()
    }
  }, [inView])

  const loadMoreProducts = async () => {
    const nextPage = page + 1
    const newProducts = await getProducts({
      ...Object.fromEntries(searchParams),
      page: nextPage.toString(),
    })
    setProducts((prevProducts) => [...prevProducts, ...newProducts])
    setPage(nextPage)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <div ref={ref}></div>
    </div>
  )
}


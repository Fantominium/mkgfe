'use server'

import { ProductsArray } from '@/app/Constants/ProductConstants/ProductConstants'
import { Product } from '@/app/Constants/ProductConstants/ProductTypes'
// This is a mock function. In a real application, you would fetch data from a database or API.
interface ProductParams {
  listingDate?: string
  itemType?: string
  marketCategory?: string
  sort?: string
  page?: string
}
export async function getProducts(params: ProductParams): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Mock products data
  const allProducts: Product[] = ProductsArray

  let filteredProducts = [...allProducts]

  // Apply filters
  if (params.listingDate) {
    const date = new Date()
    if (params.listingDate === 'week') {
      date.setDate(date.getDate() - 7)
    } else if (params.listingDate === 'month') {
      date.setMonth(date.getMonth() - 1)
    } else if (params.listingDate === 'year') {
      date.setFullYear(date.getFullYear() - 1)
    }
    filteredProducts = filteredProducts.filter(product => new Date(product.listingDate) >= date)
  }

  if (params.itemType) {
    filteredProducts = filteredProducts.filter(product => product.itemType === params.itemType)
  }

  if (params.marketCategory) {
    filteredProducts = filteredProducts.filter(product => product.marketCategories.includes(params.marketCategory as string))
  }

  // Apply sorting
  if (params.sort) {
    switch (params.sort) {
      case 'price_high_low':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'price_low_high':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'name_asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name_desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'date_newest':
        filteredProducts.sort((a, b) => new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime())
        break
      case 'date_oldest':
        filteredProducts.sort((a, b) => new Date(a.listingDate).getTime() - new Date(b.listingDate).getTime())
        break
    }
  }

  // Implement pagination
  const page = Number(params.page) || 1
  const pageSize = 9
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return filteredProducts.slice(start, end)
}


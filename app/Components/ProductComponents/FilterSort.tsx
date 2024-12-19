'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/Components/Common/ui/select'
import { Button } from '@/app/Components/Common/ui/button'
import { X } from 'lucide-react'

const listingDateOptions = [
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
]

const itemTypeOptions = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
]

const marketCategoryOptions = [
  { value: 'Telecoms', label: 'Telecoms' },
  { value: 'FMCG', label: 'FMCG' },
  { value: 'EdTech', label: 'EdTech' },
  { value: 'Cosmetics', label: 'Cosmetics' },
]

const sortOptions = [
  { value: 'price_high_low', label: 'Price: High to Low' },
  { value: 'price_low_high', label: 'Price: Low to High' },
  { value: 'name_asc', label: 'Name: A to Z' },
  { value: 'name_desc', label: 'Name: Z to A' },
  { value: 'date_newest', label: 'Date: Newest to Oldest' },
  { value: 'date_oldest', label: 'Date: Oldest to Newest' },
]

export default function FilterSort() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedValues, setSelectedValues] = useState({
    listingDate: '',
    itemType: '',
    marketCategory: '',
    sort: '',
  })

  const updateFilters = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    if (value) {
      current.set(key, value)
    } else {
      current.delete(key)
    }
    const search = current.toString()
    const query = search ? `?${search}` : ''
    router.push(`/products${query}`)
    setSelectedValues(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    router.push('/products')
    setSelectedValues({
      listingDate: '',
      itemType: '',
      marketCategory: '',
      sort: '',
    })
  }

  const hasFilters = Object.values(selectedValues).some(value => value !== '')

  return (
    <div className={`mb-4 sm:mb-6 transition-all duration-250 ${isCollapsed ? 'h-12' : 'h-auto'}`}>
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Filter & Sort</h2>
        <Button variant="ghost" onClick={() => setIsCollapsed(!isCollapsed)} className="text-sm sm:text-base">
          {isCollapsed ? 'Expand' : 'Collapse'}
        </Button>
      </div>
      {!isCollapsed && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4">
          <Select value={selectedValues.listingDate} onValueChange={(value) => updateFilters('listingDate', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Listing Date" />
            </SelectTrigger>
            <SelectContent>
              {listingDateOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedValues.itemType} onValueChange={(value) => updateFilters('itemType', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Item Type" />
            </SelectTrigger>
            <SelectContent>
              {itemTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedValues.marketCategory} onValueChange={(value) => updateFilters('marketCategory', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Market Category" />
            </SelectTrigger>
            <SelectContent>
              {marketCategoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedValues.sort} onValueChange={(value) => updateFilters('sort', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button variant="destructive" onClick={clearFilters} className="w-full text-sm sm:text-base">
              <X className="mr-2 h-4 w-4" /> Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  )
}


import { Card, CardContent, CardFooter } from '@/app/Components/Common/ui/card'
import { Badge } from '@/app/Components/Common/ui/badge'
import { Product } from '@/app/Constants/ProductConstants/ProductTypes'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden transition-opacity duration-250 hover:opacity-90">
      <CardContent className="p-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 sm:h-48 object-cover"
        />
        <div className="p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{product.name}</h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-2">{product.description}</p>
          <p className="text-base sm:text-lg font-bold">${product.price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-1 sm:gap-2 p-3 sm:p-4">
        {product.marketCategories.map((category) => (
          <Badge key={category} variant="secondary" className="text-xs sm:text-sm cursor-pointer">
            {category}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  )
}


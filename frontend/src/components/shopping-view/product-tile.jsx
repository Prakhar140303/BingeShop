import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
function capitalizeWords(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function ShoppingProductTile({product}) {


  return (
    <Card className='p-4'>
        <div className='flex flex-col justify-between min-h-[300px] min-w-[200px] shadow-xl'>
            <div className='relative'>
                <img src={product.image} alt={product.title} className='w-full h-[175px] object-cover rounded-t-lg' />
                {
                    product?.salePrice > 0 ?
                        <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-700'>
                            Sale
                        </Badge> : null
                }
            </div>
            <CardContent className='p-4'>
                <h2 className='text-xl font-bold mb-2'>{product.title}</h2>
                <div className='flex justify-between items-center mb-2'>
                    <span className='text-sm text-muted-foreground'>{product.category}</span>
                    <span className='text-sm text-muted-foreground'>{capitalizeWords(product.brand)}</span>
                </div>
                <div className='flex justify-between gap-2 items-center mb-2'>
                    <span className={'  '+ (product.salePrice > 0 ? ' line-through  text-sm' : ' text-primary font-semibold text-lg')}>${product.price}</span>
                    {product.salePrice > 0 && <span className='text-lg font-semibold'>$ {product.salePrice}</span>}
                </div>
            </CardContent>
            <CardFooter >
                <Button className='w-full'>Add to Cart</Button>
            </CardFooter>
        </div>
    </Card>

  )
}

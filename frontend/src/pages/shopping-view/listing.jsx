import ProductFilter from '@/components/shopping-view/productFilter'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
   DropdownMenuRadioGroup, DropdownMenuRadioItem} from '@/components/ui/dropdown-menu'
import React,{useEffect} from 'react'
import { Button } from '@/components/ui/button'
import { ArrowDownUp } from 'lucide-react'
import { sortOptions } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingProductTile from '@/components/shopping-view/product-tile'
import { fetchAllProducts } from '@/store/product-slice'
 function  ShoppingListing() {
  const {productList} = useSelector((state) => state.product);  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAllProducts());
  },[dispatch])
  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 md:p-6'>
      <ProductFilter/>
      <div className='bg-background w-full rounded-lg  shadow-sm'> 
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold'>
            All products
          </h2>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground mr-2'>
              10 products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button varient='outline' size='sm' className='flex items-center gap-1'>
                  <ArrowDownUp  className=''/>
                  <span>Sort By</span>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[200px]'>
                <DropdownMenuRadioGroup>
                 {
                  sortOptions.map(sortItem => 
                  <DropdownMenuRadioItem key={sortItem.id}>
                      {sortItem.label}
                  </DropdownMenuRadioItem>  )
                 }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-2 my-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {
            productList.map((product) => (
              <ShoppingProductTile key={product._id} product={product} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ShoppingListing
import ProductFilter from '@/components/shopping-view/productFilter'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
   DropdownMenuRadioGroup, DropdownMenuRadioItem} from '@/components/ui/dropdown-menu'
  import {Dialog, DialogContent,DialogHeader,DialogDescription,DialogTitle,DialogTrigger} from '../../components/ui/dialog.jsx'
import React,{useState, useEffect} from 'react'
import { Button } from '@/components/ui/button'
import { ArrowDownUp, UndoIcon } from 'lucide-react'
import { sortOptions } from '@/config'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchAllFilteredProducts,fetchCartProduct } from '@/store/shop/product-slice'
import ShoppingProductTile from '@/components/shopping-view/product-tile'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
const FilterMap ={
  "price-lowtohigh" :1,
  "price-hightolow" :2,
  "title-atoz" :3,
  "title-ztoa" :4,
}


function ShoppingProductTileSkeleton() {
  return (
    <Card className="shadow-2xl shadow-black rounded-xl overflow-hidden">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-muted flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Price + Rating */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>

        {/* Tags / chips */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}


function  ShoppingListing() {
  // importing the elements from the hooks
  const [filters,setFilters] = useState({});
  const [sort,setSort] = useState(null);  
  const [searchParams,setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 21;
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();
  
  const {FilteredProductList,totalPages, cartProduct,isCartLoading,isProductLoading} = useSelector((state) => state.shopProduct);  
  const {user} = useSelector((state)=> state.auth);
  const handleSort = (value) => {
    console.log({value});
    setSort(value);
    
  }

  const handleFitler = (getSectionId,getCurrentOption) => {
    console.log({getSectionId,getCurrentOption});  
    let copyFilters = {...filters};
    const indexoFCurrentSection = Object.keys(copyFilters).indexOf(getSectionId);
    if(indexoFCurrentSection === -1){
      copyFilters ={
        ...copyFilters,
        [getSectionId] : [getCurrentOption] 
      }
    }else{
      const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOption);
      if(indexOfCurrentOption === -1){
        copyFilters[getSectionId].push(getCurrentOption);
      }else{
        copyFilters[getSectionId].splice(indexOfCurrentOption,1 );
      }
    }
    setFilters(copyFilters);
    sessionStorage.setItem('filters',JSON.stringify(copyFilters));
    console.log(copyFilters);
  }
  useEffect(()=>{
    setSort('price-lowtoHigh');
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
  },[])
  const SortType = FilterMap[sort];
  const goToPage = (newPage) => {
    searchParams.set('page', newPage)
    setSearchParams(searchParams);
  };



  useEffect(()=>{
    dispatch(fetchCartProduct({userId : user.id}));
  },[dispatch,user?.id])

  useEffect(()=>{
    dispatch(fetchAllFilteredProducts({filters,SortType,page,limit}));
    
  },[dispatch,filters,SortType,page,limit]);
  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 md:p-6'>
      <ProductFilter filters= {filters} handleFilter={handleFitler}/>
      <div className='bg-background w-full rounded-lg  shadow-sm'> 
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold'>
            All products
          </h2>
          <div className='flex items-center gap-3'>

            <span className='text-muted-foreground mr-2'>
              {FilteredProductList.length} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='flex items-center gap-1'>
                  <ArrowDownUp  className=''/>
                  <span>Sort By</span>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[200px]'>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                 {
                  sortOptions.map(sortItem => 
                  <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                      {sortItem.label}
                  </DropdownMenuRadioItem>  )
                 }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-8 my-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-4'>
          { !isCartLoading && !isProductLoading ?
            FilteredProductList.map((product) =>{ 
               let cartEntry = cartProduct?.find((c) => c.productId._id === product._id);
              if(!cartEntry){
                cartEntry = { quantity: 0, _id: null }; // Default value if not found
              }
              return(
                <div id={product._id}>
                  <ShoppingProductTile key={product._id} product={product} cartEntry = {cartEntry}/>
                   {/* Modal Trigger */}
          <Dialog open={selectedProduct?._id === product._id} onOpenChange={(open) => !open && setSelectedProduct(null)}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => setSelectedProduct(product)}>
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{product.title}</DialogTitle>
                <DialogDescription>{product.description}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <img src={product.image} alt={product.title} className="rounded-lg max-h-60 object-contain" />
                <p className="text-lg font-semibold">Price: ₹{product.price}</p>
                <Button>Add to Cart</Button>
              </div>
            </DialogContent>
          </Dialog>
                </div>
              
            )}) : 
              (
                Array.from({ length: 12 }).map((_, i) => (
                    <ShoppingProductTileSkeleton key={i} />
                ))
              )
          }
        </div>
        <div className='flex items-center justify-center gap-4 py-4'>
          <Button onClick={() => goToPage(page - 1)} disabled={page === 1}>
          Prev
        </Button>
        <span>Page {page}</span>
        <Button onClick={() => goToPage(page + 1) } disabled={page === totalPages}>Next</Button>

        </div>
      </div>
    </div>
  )
}

export default ShoppingListing
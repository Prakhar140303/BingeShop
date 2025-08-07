import ProductFilter from '@/components/shopping-view/productFilter'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
   DropdownMenuRadioGroup, DropdownMenuRadioItem} from '@/components/ui/dropdown-menu'
import React,{useState, useEffect, useMemo} from 'react'
import { Button } from '@/components/ui/button'
import { ArrowDownUp } from 'lucide-react'
import { sortOptions } from '@/config'
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
console.log(FilterMap["price-lowtohigh"]);

function  ShoppingListing() {
  // importing the elements from the hooks
  const [filters,setFilters] = useState({});
  const [sort,setSort] = useState(null);  
  const [searchParams,setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const dispatch = useDispatch();
  
  const {FilteredProductList,totalPages} = useSelector((state) => state.shopProduct);  
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
    if(user?.id){
      dispatch(fetchCartProduct({userId : user.id}));
    }
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
          {
            FilteredProductList.map((product) => (
              <ShoppingProductTile key={product._id} product={product} />
            ))
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
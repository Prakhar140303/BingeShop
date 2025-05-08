import React,{useState,useEffect} from 'react'
import { Button } from '@/components/ui/button.jsx'
import {Sheet,SheetContent, SheetHeader, SheetTitle} from '@/components/ui/sheet.jsx'
// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion'
import { Plus } from 'lucide-react'
import CommonForm from '@/components/common/form'
import { addProductFormElements } from '@/config'
import ProductImageUpload from './image-upload'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts , addNewProduct} from '@/store/product-slice'
import { useToast } from '@/hooks/use-toast';
import  AdminProductTile  from '@/components/admin-view/product-tile.jsx';
const initialFormData = {
  image : null,
  title : '',
  description : '',
  category : '',
  brand: '',
  price : "",
  salePrice : 0,
  TotalStock : '',
}
function AdminProducts() {
  const [openCreateProductsDialog,setOpenCreateProductsDialog] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false); 
  const {productList} = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const toast = useToast();
  function onsubmit(event){
    event.preventDefault();
    dispatch(addNewProduct({...formData,image : uploadedImageUrl}))
    .then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setUploadedImageUrl('');
        toast({
          title : 'Product added successfully',
        })
      }
    });
  }
  useEffect(()=>{
    dispatch(fetchAllProducts());
  },[dispatch]);
  console.log({productList});
  
  return (
    <>
    <div  className='flex flex-col gap-4 w-full'>

      <div className='mb-5 flex justify-end w-full'>
        <motion.div whileTap={{scale : 0.98}}>
          <Button
            onClick={() => setOpenCreateProductsDialog(true)}>
              Add New Product
                <Plus />
            </Button>
        </motion.div>
      </div>
      <div className='flex flex-col gap-6'>
        {
          productList.map((product) => (
            <AdminProductTile key={product._id} product={product} />
          ))
        }

      </div>
    </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'></div>
      <Sheet open={openCreateProductsDialog} onOpenChange={()=>setOpenCreateProductsDialog(false)}>
        <SheetContent side="right" className='overflow-auto'>
          <SheetHeader className='mb-4'>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} 
            setFile={setImageFile} 
            uploadedImageUrl={uploadedImageUrl} 
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}  
            imageLoadingState={imageLoadingState}
            />
          <div className='py-6'>
            <CommonForm formData={formData} 
                onSubmit={onsubmit} 
                setFormData={setFormData} 
                formControls={addProductFormElements} 
                buttonText={'Add'}>
            </CommonForm>

          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default AdminProducts
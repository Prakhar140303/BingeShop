import React,{useState} from 'react'
import { Button } from '@/components/ui/button.jsx'
import {Sheet,SheetContent, SheetHeader, SheetTitle} from '@/components/ui/sheet.jsx'
// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion'
import { Plus } from 'lucide-react'
import CommonForm from '@/components/common/form'
import { addProductFormElements } from '@/config'
import ProductImageUpload from './image-upload'

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
  const onsubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData(initialFormData);
  }

  return (
    <>
      <div className='mb-5 flex justify-end'>
        <motion.div whileTap={{scale : 0.98}}>
          <Button
            onClick={() => setOpenCreateProductsDialog(true)}>
              Add New Product
                <Plus />
            </Button>
        </motion.div>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'></div>
      <Sheet open={openCreateProductsDialog} onOpenChange={()=>setOpenCreateProductsDialog(false)}>
        <SheetContent side="right" className='overflow-auto'>
          <SheetHeader className='mb-4'>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}/>
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
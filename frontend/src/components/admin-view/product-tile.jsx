import{ Card} from "../ui/card.jsx";
import { IndianRupee ,RotateCw } from "lucide-react";
import { Button } from "../ui/button";
import { useState,useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import  CommonForm  from "../common/form.jsx";
import  ProductImageUpload  from "../../pages/admin-view/image-upload.jsx";
import { addProductFormElements } from "@/config/index.js";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "@/store/product-slice/index.js";
import { addNewProduct } from "@/store/product-slice/index.js";
import { useToast } from "@/hooks/use-toast.js";
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
function AdminProductTile({product}) {
    const [formData, setFormData] = useState(product);
    const [openEditDialogBox,setOpenEditDialogBox] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const handleEditProduct = (product) => {
        setOpenEditDialogBox(true);
        console.log(product);
    }
    const handleDeleteProduct = (product) => {
        console.log(product);
    }
    const dispatch = useDispatch();
    const toast = useToast();
    function onsubmit(event){
        event.preventDefault();
        dispatch(addNewProduct({...formData,image : uploadedImageUrl}))
        .then((data)=>{
        console.log(data);
        if(data?.payload?.success){
            dispatch(fetchAllProducts());
            setOpenEditDialogBox(false);
            setImageFile(null);
            setUploadedImageUrl('');
            toast({
            title : 'Product added successfully',
            })
        }
        });
    }

    return (  
        <>
            <Card >
                <div className='w-full flex flex-row gap-6
                    bg-gray-200 border-4 rounded-md p-2
                        shadow-lg '>
                        <img src={product.image} alt="" className=" md:h-30 h-10" />
                        <div className="flex  smd:flex-row flex-col justify-evenly w-full">
                            <div className="flex flex-col">
                                <p className="text-lg font-semibold">{product.description}</p>
                                <p><strong>Category : </strong>{product.category}</p>
                                <p> <strong>Quantity : </strong>{product.totalStock}</p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold  ">{product.title}</h2>
                                <div className="flex flex-row gap-5">
                                    <p className={`text-lg ${ product.salePrice>0 ?"line-through" :""}`} >{product.price}</p>
                                    <div className="flex flex-row w-full justify-center items-center">
                                        {
                                            product.salePrice>0 ?
                                            <p className="text-xl">{product.salePrice} </p>: <div></div> 
                                        }
                                        
                                        <IndianRupee className="h-4"/>
                                    </div>
                                </div>
                            </div>
                                <div className="flex flex-col gap-2 ">
                                    <Button onClick={() => handleEditProduct(product)}>Edit</Button>
                                    <Button onClick={() => handleDeleteProduct(product)}>Delete</Button>
                                </div>

                        </div>
                </div>
            </Card>
            <Sheet open={openEditDialogBox} onOpenChange={()=>setOpenEditDialogBox(false)}>
            <SheetContent side="right" className='overflow-auto'>
            <SheetHeader className='mb-4'>
                <SheetTitle     >Add New Product</SheetTitle>
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
                    buttonText={'Save'}>
                </CommonForm>

            </div>
            <Button onClick={() => setFormData(initialFormData)} className='w-full '>
                <RotateCw />
                Reset</Button>
            </SheetContent>
        </Sheet>
      </>
    );
}

export default AdminProductTile;
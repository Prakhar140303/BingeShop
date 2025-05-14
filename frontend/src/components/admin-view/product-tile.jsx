import{ Card} from "../ui/card.jsx";
import { IndianRupee ,RotateCw } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import  CommonForm  from "../common/form.jsx";
import  ProductImageUpload  from "../../pages/admin-view/image-upload.jsx";
import { addProductFormElements } from "@/config/index.js";
import { useDispatch } from "react-redux";
import { editProduct, fetchAllProducts } from "@/store/product-slice/index.js";
import { useToast } from "@/hooks/use-toast.js";
const initialFormData = {
  image : null,
  title : '',
  description : '',
  category : '',
  brand: '',
  price : "",
  salePrice : 0,
  totalStock : '',
}
function AdminProductTile({product, handleDeleteProduct}) {
    const [formData, setFormData] = useState(product);
    const [openEditDialogBox,setOpenEditDialogBox] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(product.image);
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch();
    const {toast} = useToast();
    const handleEditProduct = (product) => {
        setFormData({
            ...initialFormData,
            title: product.title,
            description: product.description,
            category: product.category,
            brand: product.brand,
            price: product.price,
            salePrice: product.salePrice,
            totalStock: product.totalStock,
        });
        setImageFile(null);                
        setUploadedImageUrl(product.image); 
        setImageLoadingState(false);
        setOpenEditDialogBox(true);

        console.log(product);
    }
    
    function onsubmit(event){
        event.preventDefault();
        const payload = {
            ...formData,
            image: uploadedImageUrl
        };
        dispatch(editProduct({ id: product._id,formData : payload}))
        .then((data)=>{
        console.log(data);
        if(data?.payload?.success){
            dispatch(fetchAllProducts());
            setOpenEditDialogBox(false);
            setImageFile(null);
            setUploadedImageUrl('');
            toast({
            title : 'Product edited successfully',
            })
        }
        });
    }

   


    return (  
        <>
            <Card >
                <div className='w-full flex smd:flex-row flex-col gap-6
                    bg-gray-200 border-4 rounded-md p-2
                        shadow-lg  items-center'>
                        <img src={product.image} alt="product image" className=" md:h-30 smd:h-32 size-28 " />
                        <div className="flex  smd:flex-row flex-col justify-evenly w-full">
                            <div className="flex flex-col">
                                <p className="text-lg font-semibold hidden smd:block">{product.description}</p>
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
                                            <>
                                                <p className="text-xl">{product.salePrice} </p>
                                                <IndianRupee className="h-4"/>
                                            </>
                                                : <div></div> 
                                        }
                                        
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
                <SheetTitle     >Edit  Product</SheetTitle>
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
                    buttonText={'Save'}
    
                    >
                    
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
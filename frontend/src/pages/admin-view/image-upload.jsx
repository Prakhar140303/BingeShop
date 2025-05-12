import React, {  useEffect, useRef } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UploadCloudIcon , FileIcon,Trash2} from 'lucide-react';
import axiosInstance from '@/lib/axiosInstance';
import { Skeleton } from '@/components/ui/skeleton';
function ProductImageUpload({imageFile, setFile,
     uploadedImageUrl, setUploadedImageUrl, 
      setImageLoadingState, imageLoadingState}) {
    const inputRef  = useRef(null);
    const handleImageFileChange = (event) => {
        const file = event.target.files?.[0];
        if(file){
            setFile(file);
        }
    }
    const handleDragOver = (event)=>{
        event.preventDefault();

    }
    const handleDrop = (event)=>{
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile){
            setFile(droppedFile);
        }
    }
    const handleRemoveImage =()=>{
        setFile(null);
        setUploadedImageUrl('');
        if(inputRef.current){
            inputRef.current.value = '';
        }
    }
    
    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append('my_file', imageFile);
        const response = await axiosInstance.post('/admin/products/upload-image', data);
        console.log("response : ",response.data)
        if(response?.data?.success){
            setUploadedImageUrl(response.data.result.url);
        }
        setImageLoadingState(false);
    }
    useEffect(() => {
        if(imageFile !== null){
            uploadImageToCloudinary();
        }
    },[imageFile]);
    return (
        <div className="w-full max-w-md mx-auto mt-4">
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-4 border-dashed rounded-lg p-2"
            >
            <Input
                id="image-upload"
                type="file"
                className="hidden"
                ref={inputRef}
                onChange={handleImageFileChange}
            />

            {/* If no new file is selected… */}
            {!imageFile ? (
                // …but we _do_ have a previously uploaded URL, show it
                uploadedImageUrl ? (
                <div className="relative">
                    <img
                    src={uploadedImageUrl}
                    alt="Product"
                    className="w-full h-32 object-contain rounded-md"
                    />
                    <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1"
                    onClick={handleRemoveImage}
                    >
                    <Trash2 />
                    </Button>
                </div>
                ) : (
                // …otherwise fall back to the blank drag-and-drop UI
                <Label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center h-32 cursor-pointer"
                >
                    <UploadCloudIcon className="w-10 h-10 text-muted-foreground" />
                    <span>Drag & drop or click to upload</span>
                </Label>
                )
            ) : imageLoadingState ? (
                // showing skeleton while new upload is in progress
                <Skeleton className="w-full h-10 bg-gray-500" />
            ) : (
                // showing the newly-selected file name
                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <FileIcon className="w-8 text-primary mr-2 h-8" />
                    <p>{imageFile.name}</p>
                    <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={handleRemoveImage}
                    >
                    <Trash2 />
                    <span className="sr-only">Remove File</span>
                    </Button>
                </div>
                </div>
            )}
            </div>
        </div>
    );

}

export default ProductImageUpload
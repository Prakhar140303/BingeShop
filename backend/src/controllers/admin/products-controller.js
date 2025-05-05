// import 

import { imageUploadUtils } from "../../helpers/cloudinary.js";

const handleImageUpload = async (req,res)=>{
    try{
        console.log(req.file);
        
        if(!req.file){
            return res.json({
                success : false,
                message : "No file uploaded"
            });
        }
        const b64  = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:"+ req.file.mimetype + ";base64,"+ b64;
        const result  =await imageUploadUtils(url);

        res.json({
            success: true ,
            result: result
        })
    }catch(error){
        console.log(error);
        res.json({
            success : false,
            message : "Error in image upload"
        })
    }
}
export {handleImageUpload}
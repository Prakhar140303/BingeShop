import{ Card} from "../ui/card.jsx";
import { IndianRupee } from "lucide-react";
import { Button } from "../ui/button";
function AdminProductTile({product}) {
    return (  
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
                                <Button >Edit</Button>
                                <Button >Delete</Button>
                            </div>

                    </div>
            </div>
        </Card>
    );
}

export default AdminProductTile;
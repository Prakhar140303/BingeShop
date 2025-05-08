import{ Card} from "../ui/card.jsx";
function AdminProductTile({product}) {
    return (  
        <Card >
            <div className='w-full flex flex-row p-2  gap-6 bg-gray-200 border-4 rounded-md border-gray-500'>
                    <img src={product.image} alt="" className="h-20 rounded-full" />
                    <div>
                        <h2 className="text-2xl font-bold">{product.title}</h2>
                        <p className="text-lg">{product.description}</p>
                        <div className="flex flex-row gap-2">
                            <p className="text-lg " style={{ textDecoration: 'line-through' }}>{product.price}</p>
                            <p className="text-xl">{product.salePrice}</p>
                        </div>
                    </div>
            </div>
        </Card>
    );
}

export default AdminProductTile;
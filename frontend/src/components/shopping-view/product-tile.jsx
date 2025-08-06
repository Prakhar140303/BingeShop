import React,{useState} from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addCartProduct, deleteCartProduct, fetchCartProduct } from '@/store/shop/product-slice';
import { motion } from 'framer-motion';

function capitalizeWords(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function ShoppingProductTile({ product, isHome = false }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartProduct, loadingProductId } = useSelector(state => state.shopProduct);
  const MotionCard = motion(Card);
  const productInCart = cartProduct.find(item => item.productId._id === product._id);


  const isCurrentLoading = loadingProductId === product._id;
  const [productQuantity,setProductQuantity] = useState(productInCart ? productInCart.quantity : 0);

  const handleAdd = async () => {
    await dispatch(addCartProduct({ userId: user.id, productId: product._id })).unwrap();
    dispatch(fetchCartProduct({ userId: user.id }));
    setProductQuantity(prev => prev + 1);
  };

  const handleRemove = async () => {
    await dispatch(deleteCartProduct({ cartProductId: productInCart._id })).unwrap();
    dispatch(fetchCartProduct({ userId: user.id }));
    setProductQuantity(prev => Math.max(0, prev - 1));
  };

  return (
    <MotionCard className="p-4" whileHover={{ scale: 1.05 }} whileTap={{scale: 1}} transition={{ duration: 0.2, ease: "easeInOut" }}>
      <div className="flex flex-col justify-between min-h-[50vh] min-w-[35vh] shadow-2xl shadow-black rounded-xl">
        {/* Image Section */}
        <div className="relative">
          <img src={product.image} alt={product.title} className="w-full h-[20vh] object-cover object-center rounded-t-lg" />
          {product?.salePrice > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-700">
              Sale
            </Badge>
          )}
        </div>

        {/* Product Details */}
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{product.category}</span>
            <span className="text-sm text-muted-foreground">{capitalizeWords(product.brand)}</span>
          </div>
          <div className="flex justify-between gap-2 items-center mb-2">
            <span className={(product.salePrice > 0 ? 'line-through text-sm' : 'text-primary font-semibold text-lg')}>
              ${product.price}
            </span>
            {product.salePrice > 0 && <span className="text-lg font-semibold">$ {product.salePrice}</span>}
          </div>
        </CardContent>

        {/* Footer Buttons */}
        <CardFooter>
          {isCurrentLoading ? (
            <div className="">wait..</div>
          ) : !isHome && (productQuantity === 0 ? (
            <Button className="w-full" onClick={handleAdd}>
              Add to Cart
            </Button>
          ) : (
            <div className="w-full flex flex-row items-center justify-between">
              <Button className="font-bold" onClick={handleRemove}>-</Button>
              <p className="font-bold text-2xl">{productQuantity}</p>
              <Button className="font-bold" onClick={handleAdd}>+</Button>
            </div>
          ))}
        </CardFooter>
      </div>
    </MotionCard>
  );
}

import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addCartProduct, deleteCartProduct } from '@/store/shop/product-slice';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

function capitalizeWords(str) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export default function ShoppingProductTile({ product, isHome = false }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { cartProduct, loadingProductId } = useSelector(
    (state) => state.shopProduct
  );
  const MotionCard = motion(Card);

  // ✅ derive quantity from Redux cart
  const cartItem = cartProduct.find((item) => item.productId._id === product._id);
  const productQuantity = cartItem?.quantity || 0;
  const isCurrentLoading = loadingProductId === product._id;

  const handleAdd = async () => {
    try {
      await dispatch(
        addCartProduct({ userId: user.id, productId: product._id })
      ).unwrap();
      toast({ title: '✅ Product added to cart' });
    } catch (err) {
      toast({ title: '❌ Failed to add product', description: err.message });
    }
  };

  const handleRemove = async () => {
    try {
      if (!cartItem) return;
      await dispatch(deleteCartProduct({ cartProductId: cartItem._id })).unwrap();
      toast({ title: '✅ Product removed from cart' });
    } catch (err) {
      toast({ title: '❌ Failed to remove product', description: err.message });
    }
  };

  return (
    <MotionCard
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <div className="flex flex-col justify-between min-h-[50vh] min-w-[35wh] shadow-2xl shadow-black rounded-xl">
        {/* Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[20vh]  rounded-t-lg"
            onError={(e) => {
              e.currentTarget.src = '/fallback.png';
            }}
          />
          {product?.salePrice > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-700">
              Sale
            </Badge>
          )}
        </div>

        {/* Details */}
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{product.category}</span>
            <span className="text-sm text-muted-foreground">
              {capitalizeWords(product.brand)}
            </span>
          </div>
          <div className="flex justify-between gap-2 items-center mb-2">
            <span
              className={
                product.salePrice > 0
                  ? 'line-through text-sm'
                  : 'text-primary font-semibold text-lg'
              }
            >
              ${product.price}
            </span>
            {product.salePrice > 0 && (
              <span className="text-lg font-semibold">${product.salePrice}</span>
            )}
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter>
          {isCurrentLoading ? (
            <div className="w-full flex justify-center items-center py-2">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          ) : !isHome && (productQuantity === 0 ? (
            <Button className="w-full" onClick={handleAdd}>
              <ShoppingCart />
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

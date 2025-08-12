import axiosInstance from "../../lib/axiosInstance.js";
  import { fetchCartProduct } from '@/store/shop/product-slice';
  import React, { useEffect } from 'react'
  import { useSelector, useDispatch } from 'react-redux'
  import { deleteCartProduct,addCartProduct } from '@/store/shop/product-slice';
  import { Button } from '@/components/ui/button';
  import { useToast } from '@/hooks/use-toast';
  function capitalizeWords(str) {
    if(!str) return '';
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  export default function ShoppingCheckout() {
    const dispatch = useDispatch();
    const { cartProduct } = useSelector((state) => state.shopProduct);
    const { user } = useSelector((state) => state.auth);
    const { toast } = useToast();

    const DELIVERY_FEE = 5.00;      
    const TAX_RATE = 0.08;        
    useEffect(() => {
      if (user?.id) {
        dispatch(fetchCartProduct({ userId: user.id }));
      }
    }, [dispatch, user]);

    const subtotal = cartProduct.reduce((sum, cp) => {
      const unitPrice = cp.productId.salePrice > 0
        ? cp.productId.salePrice
        : cp.productId.price;
      return sum + unitPrice * cp.quantity;
    }, 0);

    const tax = subtotal * TAX_RATE;
    const total = subtotal + DELIVERY_FEE + tax;
    const handleAdd = async (product) => {
        await dispatch(addCartProduct({productId : product.productId._id,userId :product.userId._id})).unwrap();
        dispatch(fetchCartProduct({ userId: user.id }));
        toast({
          title: 'Product added to cart',
        });
    };
    
      const handleRemove = async (product) => {
        await dispatch(deleteCartProduct({cartProductId :product._id})).unwrap();
        dispatch(fetchCartProduct({ userId: user.id }));
        toast({
          title: 'Product removed from cart',
        });
    };


async function handleCheckout() {
    try {
        // Step 1: Create order in backend
          const { data } = await axiosInstance.post("/payments/create-order",{
            userId: user.id
          });
          
        if (!data?.success) {
            alert("Failed to create order");
            return;
        }

        const order = data.data;

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "My Shop",
                description: "Test Transaction",
                order_id: order.id,
                handler: async function (response) {
                  
                    const verifyRes = await axiosInstance.post("/payments/verify-payment", {
                        orderId: response.razorpay_order_id,
                        paymentId: response.razorpay_payment_id,
                        signature: response.razorpay_signature
                    });

                    if (verifyRes.data.success) {
                        alert("Payment Successful!");
                    } else {
                        alert("Payment Verification Failed!");
                    }
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        };

        script.onerror = () => {
            alert("Failed to load Razorpay SDK. Please try again.");
        };

    } catch (error) {
        console.error(error);
        alert("Something went wrong while initiating payment.");
    }
}


    return (
      <div className='flex md:flex-row flex-col w-full pt-12 '>
        <div className='flex-[2] flex flex-col gap-2  items-center max-h-screen overflow-y-auto bg-black/10 pt-4'>
          {cartProduct.map((product, idx) => (
            <div className='flex sm:flex-row flex-col  border-[2px] rounded-xl w-[95%] max-h-[32vh] border-gray-300 shadow-lg bg-white ' key={product._id || idx}>
              <img
                className='h-full min-w-[32vh] w-[32vh] object-cover rounded-lg'
                src={product.productId.image}
                alt={product.productId.title}
              />
              <div className='flex flex-col py-4 pl-12 gap-2'>
                <h2 className='text-xl  font-bold mb-2'>{product.productId.title}</h2>
                <div className='flex flex-row gap-4 text-lg'>
                  <span className=''>{product.productId.category}</span>
                  <span className=''>{capitalizeWords(product.productId.brand)}</span>

                </div>
                <span className=''>{product.productId.description}</span>
                <div>
                  
                </div>
                <div className='w-[20vh] flex flex-row items-center justify-between'>
                  <Button  className='font-bold' onClick ={()=>handleRemove(product)}>
                      -
                  </Button>
                    <p className='font-bold text-2xl'>{product.quantity} </p>
                  <Button  className='font-bold' onClick ={()=>handleAdd(product)}>
                      +
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex-[1] px-8'>
          <div className='sticky top-20'>
            {cartProduct.length > 0 && (
              <div className="mt-8 p-6 bg-white rounded-xl shadow-lg shadow-black/25">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Delivery Fee</span>
                  <span>${DELIVERY_FEE.toFixed(2)}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button className="w-full mt-6 py-2 bg-primary text-white rounded-lg"
                onClick={() => {handleCheckout()}}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

import axiosInstance from "../../lib/axiosInstance.js";
import { fetchCartProduct } from '@/store/shop/product-slice';
import React, { useEffect ,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCartProduct,addCartProduct } from '@/store/shop/product-slice';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getAddress } from "@/store/auth-slice/index.js";
import AddressChoiceModal from '@/components/shopping-view/AddressChoice.jsx'
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

  function capitalizeWords(str) {
    if(!str) return '';
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  export default function ShoppingCheckout() {
    const dispatch = useDispatch();
    const { cartProduct,isCartLoading } = useSelector((state) => state.shopProduct);
    const {addresses} = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);
    const { toast } = useToast();
    const [isPaymentoading, setIsPaymentLoading] = useState(false);
    const [address, setaddress] = useState("");
    const [selectedAddress, setSelectedAddress] = useState(false);


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
    useEffect(()=>{
      dispatch(getAddress({userId: user.id}));
      setaddress(addresses[0] || "");
    },[]);
    useEffect(() => {
      if (addresses.length > 0 && !address) {
        setaddress(addresses[0]);
    }
}, [addresses, address]);
    console.log(addresses);
async function handleCheckout() {
    try {
        // Step 1: Create order in backend
        setIsPaymentLoading(true);
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
                    setIsPaymentLoading(false);
                    if (verifyRes.data.success) {
                        alert("Payment Successful!");
                    } else {
                        alert("Payment Verification Failed!");
                    }
                },
                 modal: {
                    ondismiss: () => {
                        setIsPaymentLoading(false); // ⬅️ Enable screen if user closes Razorpay
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
            setIsPaymentLoading(false);
        };

    } catch (error) {
        console.error(error);
        alert("Something went wrong while initiating payment.");
        setIsPaymentLoading(false);
    }
}


    return (
      <div className='flex md:flex-row flex-col w-full pt-12 lg:h-[78.2vh]  md:[80vh]'>
        {isPaymentoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="loader"></div>
          </div>
        )}
        <div className='flex-[2] flex flex-col gap-2  items-center max-h-screen overflow-y-auto bg-black/10 pt-4'>
          {!isCartLoading ? cartProduct.map((product, idx) => (
            <div className='flex sm:flex-row flex-col  border-[3px] rounded-xl w-[95%] max-h-[32vh] border-gray-300 shadow-lg bg-white ' key={product._id || idx}>
              <img
                className='h-full min-w-[32vh] w-[32vh] object-cover rounded-lg md:block hidden'
                src={product.productId.image}
                alt={product.productId.title}
              />
              <div className='flex flex-col py-4 pl-12 gap-2'>
                <h2 className='text-xl  font-bold mb-2'>{product.productId.title}</h2>
                <div className='flex flex-row gap-4 text-md'>
                  <div className='bg-slate-200 rounded-md p-1'><span className="text-xl font-semibold">Category: </span>{product.productId.category}</div>
                  <div className='bg-slate-200 rounded-md p-1 px-2'><span className="text-xl font-semibold">Brand : </span>{capitalizeWords(product.productId.brand)}</div>

                </div>
                <span className='hidden md:block text-sm'>{product.productId.description}</span>
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
          )) : (    
                Array.from({ length: 3 }).map((_, i) => (
                    <CartProductSkeleton key={i} />
                ))
          )
        }
        </div>

        <div className='flex-[1] px-8'>
          <div>
            <h1 className='text-2xl font-bold mb-4 w-full text-center'>Address</h1>
            <div className="relative  w-full flex flex-col">
                <div  className='p-4 border rounded-lg shadow-md'>
                  <h3 className='text-lg font-semibold'>{address.label}</h3>
                  <p>{address.street}, {address.city}, {address.state}, {address.postalCode}</p>
                  <p>{address.country}</p>
              </div>
              <Button className="" onClick={()=>setSelectedAddress(true)} >Change Address</Button>
              {selectedAddress && (
                <AddressChoiceModal setaddress={setaddress} setSelectedAddress={setSelectedAddress} />
              )}
            </div>
          </div>
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

  function CartProductSkeleton() {
  return (
    <Card className="flex sm:flex-row flex-col border-[3px] rounded-xl w-[95%] max-h-[32vh] border-gray-300 shadow-lg bg-white animate-pulse">
      {/* Image placeholder */}
      <Skeleton className="h-full min-w-[32vh] w-[32vh] object-cover rounded-lg md:block hidden" />

      {/* Content placeholder */}
      <div className="flex flex-col py-4 pl-12 gap-2 w-full">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Category & Brand */}
        <div className="flex flex-row gap-4">
          <Skeleton className="h-6 w-28 rounded-md" />
          <Skeleton className="h-6 w-20 rounded-md" />
        </div>

        {/* Description */}
        <Skeleton className="h-4 w-full hidden md:block" />

        {/* Quantity Controls */}
        <div className="w-[20vh] flex flex-row items-center justify-between mt-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-6 w-8" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    </Card>
  );
}
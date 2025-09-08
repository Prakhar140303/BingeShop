import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAddress } from "@/store/auth-slice";

function AddressChoice({ setaddress, setSelectedAddress }) {
  const { addresses = [] } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);

  const handleSetAddress = (address) => {
    setaddress(address);
    setSelectedAddress(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Choose an address"
      onClick={()=>setSelectedAddress(false)}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-[60vw] h-[80vh] overflow-y-auto" onClick={(e) =>{
                    e.stopPropagation();                
                }}>
        <h2 className="text-2xl font-bold mb-4">Choose an Address</h2>

        <div className="flex flex-col gap-4">
          {addresses.length === 0 ? (
            <p className="text-sm text-gray-600">No saved addresses found.</p>
          ) : (
            addresses.map((address, index) => {
              const key = address._id || index;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={(e) =>{
                    e.stopPropagation();
                    handleSetAddress(address);
                    
                }}
                  className="text-left p-4 border rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-150"
                >
                  <h3 className="text-lg font-semibold">
                    <span className="font-semibold">Type: </span>
                    {address.label}
                  </h3>
                  <p>
                    <span className="font-semibold">Address: </span>
                    {address.street}, {address.city}, {address.state}
                  </p>
                  <p>
                    <span className="font-semibold">Pincode: </span>
                    {address.postalCode}
                  </p>
                  <p>
                    <span className="font-semibold">Country: </span>
                    {address.country}
                  </p>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}


export default AddressChoice;

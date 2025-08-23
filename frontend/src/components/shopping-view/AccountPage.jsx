import React,{useState} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { User, Mail, Phone, Settings, LogOut, MapPin,UserRoundX } from "lucide-react";
import {capitalize} from "@/components/common/tool.js";
import {toast} from "react-hot-toast";
import { useToast } from "@/hooks/use-toast";
import { terminateAccount } from "@/store/auth-slice";
import { logoutUser } from "@/store/auth-slice";
function AccountPage({setOption}) {
  const {user} = useSelector(state => state.auth);
  const [confirmText, setConfirmText] = useState("");
  const {toast : mainToast} = useToast();
  const MotionButton = motion(Button);
  const  [terminateConfimationModal, setTerminateConfimationModal] = useState(false);
  const dispatch = useDispatch();
  console.log(confirmText);
  
  const handleTerminateAccount = () => {
    setTerminateConfimationModal(true);
    console.log("Account termination requested");
  };
  const handleConfirmTermination =async  () => {
    
    
    if (confirmText !== "CONFIRM") {
      toast.error("Please type 'CONFIRM' to terminate your account.", {
        duration: 3000});
      return;
    }
    else{
      setTerminateConfimationModal(false);
      try{
        const terminationResult = await dispatch(terminateAccount());
        if (terminationResult.error) {
          toast.error("Failed to terminate account. Please try again later.");
          return;
        }
        console.log("Account terminated");
        toast.success("Account terminated successfully.", {
          duration: 3000
        });
      }catch(error) {
        console.error("Error terminating account:", error);
        toast.error("Failed to terminate account. Please try again later.", {
          duration: 3000
        });
      }
    }
  }
  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {
        terminateConfimationModal && 
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-md  mb-4">Type <span className="font-bold">CONFIRM</span> to confirm Account Termination</h2>
            <input type="text" onChange={(e)=> setConfirmText(e.target.value)} className="w-full border-4 rounded "/>
            <div className="flex flex-row justify-between gap-2 mt-4">
              <Button onClick={() => setTerminateConfimationModal(false)} className="bg-gray-200 hover:bg-gray-600 text-black">
                Cancel
              </Button>
              <Button onClick={()=>handleConfirmTermination()} disabled={!confirmText || confirmText !== "CONFIRM"} className="bg-red-500 hover:bg-red-700 text-white">
                Confirm
              </Button>

            </div>
          </div>
        </div>
      }
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800">My Account</h1>

      {/* Profile Card */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="flex items-center gap-6 p-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-10 h-10 text-primary" />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{capitalize(user?.username) || "Guest User"}</h2>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Mail size={16} /> {user?.email || "Not provided"}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Phone size={16} /> {user?.phone || "Not provided"}
            </p>
          </div>

          {/* Edit Profile */}
          <MotionButton  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} variant="outline" className="rounded-xl">
            Edit Profile
          </MotionButton>
        </CardContent>
      </Card>

      {/* Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
          <CardContent className="p-5 flex flex-col gap-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Settings size={18} /> Account Settings
            </h3>
            <p className="text-sm text-gray-500">
              Manage your password, preferences, and more.
            </p>
            <MotionButton  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} size="sm" className="w-fit rounded-lg">Manage</MotionButton>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
          <CardContent className="p-5 flex flex-col gap-3" >
            <h3 className="font-semibold flex items-center gap-2">
              <MapPin size={18} /> Saved Addresses
            </h3>
            <p className="text-sm text-gray-500">
              Add or remove your delivery addresses.
            </p>
            <MotionButton  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} size="sm" className="w-fit rounded-lg" onClick ={()=> setOption('address')}>View</MotionButton>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
          <CardContent className="p-5 flex flex-col gap-3">
            <h3 className="font-semibold flex items-center gap-2">
              🛒 Orders
            </h3>
            <p className="text-sm text-gray-500">
              Track your orders and view order history.
            </p>
            <MotionButton  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} size="sm" className="w-fit rounded-lg"  onClick = {()=>setOption('order')}>View Orders</MotionButton>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
          <CardContent className="p-5 flex flex-col gap-3">
            <h3 className="font-semibold flex items-center gap-2">
              <LogOut size={18} /> Logout
            </h3>
            <p className="text-sm text-gray-500">
              Sign out of your account securely.
            </p>
            <MotionButton  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} size="sm" variant="destructive" className="w-fit rounded-lg"
            onClick={()=>{
              dispatch(logoutUser());
              mainToast({  title : "Logged out successfully", description : "You have been logged out.", duration: 3000, variant: 'success' });
            }}>
              Logout
            </MotionButton>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col w-full items-center justify-evenly">
        <div className="flex flex-row items-center justify-center gap-2 p-4 bg-red-100 rounded-lg">
          <UserRoundX />
        <h1>
            Do you want to terminate your account?
        </h1>
        <MotionButton  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} onClick ={()=>handleTerminateAccount()}>Terminate</MotionButton>

        </div>
      </div>
    </motion.div>
  );
}

export default AccountPage;

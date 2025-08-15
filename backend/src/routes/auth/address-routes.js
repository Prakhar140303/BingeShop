import express from 'express';
import { fetchAddress, addAddress, deleteAddress, updateAddress } from '../../controllers/shop/address-controller.js';
const router = express.Router();

router.get('/get-address', fetchAddress);
router.post('/add-address', addAddress);    
router.delete('/delete-address', deleteAddress);
router.put('/update-address', updateAddress);

export default router;


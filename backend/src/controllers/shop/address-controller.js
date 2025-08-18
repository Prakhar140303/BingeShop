import express from 'express';
import Address from '../../models/address-model.js';

const fetchAddress = async (req, res) => {
    try {
       console.log(req.query);
        const userId = req.query.userId; 
        const addresses = await Address.find({ user: userId });
        return res.status(200).json({
            success: true,
            data: addresses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching addresses",
            error: error.message
        });
    }
}

const addAddress = async (req, res) => {
    
    try {
        console.log(req.body);
        const userId = req.body.user.id; 
        const { label, street, city, state, postalCode, country } = req.body.address;
        const newAddress = new Address({
            user: userId,
            label,
            street,
            city,
            state,
            postalCode,
            country,
        });

        await newAddress.save();
        return res.status(201).json({
            success: true,
            message: "Address added successfully",
            data: newAddress
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error adding address",
            error: error.message
        });
    }
}
const deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.body;
        const address = await Address.findByIdAndDelete(addressId);
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Address deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting address",
            error: error.message
        });
    }
}

const updateAddress = async (req, res) => {
    
    try {
        const { addressId } = req.params;
        const { label, street, city, state, postalCode, country } = req.body;
        const updatedAddress = await Address.findByIdAndUpdate(
            addressId,
            { label, street, city, state, postalCode, country },
            { new: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: updatedAddress
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating address",
            error: error.message
        });
    }
}

export { fetchAddress, addAddress, deleteAddress, updateAddress };

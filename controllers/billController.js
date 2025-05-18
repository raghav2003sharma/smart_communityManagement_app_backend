import Bill from "../models/billSchema.js";

const createBill = async (req, res) => {
    try{
        const {title,amount,dueDate} = req.body;
        if (!title || !amount || !dueDate) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const newBill = await Bill.create({
            title,
            amount,
            dueDate,
            billStatus:"unpaid"
        });
        res.status(201).json({message:"Bill created",data:newBill,success:true})
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Bill creation failed,internal server error",success:false})
    }
}

const findAllBills = async (req, res) => {
    try{
        const bills = await Bill.find();
        res.status(200).json({message:"All bills fetched",data:bills,success:true})
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Failed to fetch bills,internal server error",success:false})
    }
}
const findBillById = async (req, res) => {
    try{
        const bill = await Bill.findById(req.params.id);
        res.status(200).json({message:"Bill fetched",data:bill,success:true})
    }   catch(err){
        console.log(err.message);
        res.status(500).json({message:"Failed to fetch bill,internal server error",success:false})
    }
}
const updateBill = async (req, res) => {    
    try{
        const updatedBill = await Bill.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({message:"Bill updated",data:updatedBill,success:true})
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({message:"Failed to update bill,internal server error",success:false})
    }
}
const deleteBill = async (req, res) => {
    try{
        const deletedBill = await Bill.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Bill deleted",data:deletedBill,success:true})
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({message:"Failed to delete bill,internal server error",success:false})
    }
}

export {createBill,findAllBills,findBillById,updateBill,deleteBill}
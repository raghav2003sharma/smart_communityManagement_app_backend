import Bill from "../models/billSchema.js";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import Stripe from "stripe";
const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY);

const createBill = async (req, res) => {
    try{
        const {title,amount,dueDate} = req.body;
        if (!title || !amount || !dueDate) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
         let code;
        let exists;
                do {
                    code = `BILL-${crypto.randomBytes(4).toString('hex')}`;// generates random hex
                    const result = await Bill.find({displayId: code});// check if the code already exists
                    // if it exists, generate a new code
                    exists = result.length > 0;
                } while (exists);
                
        const newBill = await Bill.create({
            title,
            amount,
            dueDate,
            billStatus:"unpaid",
            displayId: code
        });
        console.log("New bill created:", newBill);
        res.status(201).json({message:"Bill created",data:newBill,success:true})
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Bill creation failed,internal server error",success:false})
    }
}
//pay bill using stripe
const payBill = async (req, res) => {
    try{    
        const id = req.body.id;
        if (!id) {
            return res.status(400).json({ message: "Bill ID is required", success: false });
        }
        const bill = await Bill.findOne({displayId: id});
        if (!bill) {
            return res.status(404).json({ message: "Bill not found", success: false });
        }
        if (bill.billStatus === "paid") {
            return res.status(400).json({ message: "Bill is already paid", success: false });
        }
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
         price_data: {
          currency: 'inr',
        product_data: { name: id ,description: bill.title},
        unit_amount: bill.amount,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.CORS_ORIGIN}/payment-success`,
    cancel_url: `${process.env.CORS_ORIGIN}/payment-failed`,
  });
  res.status(200).json({ url: session.url,billId:id });
}catch(err){
        console.log(err.message);
        res.status(500).json({message:"Failed to pay bill,internal server error",success:false})
    }
}

const findAllBills = async (req, res) => {
    try{
        const bills = await Bill.find();
        console.log("bills fetched",bills);
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
const updateStatus = async(req,res)=>{//update status to paid after success payment
    try{
        const {id} = req.body;
        await Bill.updateOne({displayId:id},{$set:{billStatus:"paid"}});
        return res.status(200).json({message:"bill status updated",success:true});
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"internal server error",success:false});
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
const deleteAll = async(req,res)=>{//delete all bills
    try{
        await Bill.deleteMany({});
        res.status(200).json({message:"All bills deleted",success:true})
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({message:"Failed to delete all bills,internal server error",success:false})
}
}

export {createBill,findAllBills,findBillById,updateBill,deleteBill,payBill,deleteAll,updateStatus};
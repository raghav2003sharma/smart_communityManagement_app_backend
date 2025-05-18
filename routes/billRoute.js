import {createBill,findAllBills,findBillById,updateBill,deleteBill} from "../controllers/billController.js";
import {authorizeRole} from "../middlewares/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/create",authorizeRole,createBill);
router.get("/find",findAllBills);
router.get("/find/:id",findBillById);
router.put("/update/:id",authorizeRole,updateBill);
router.delete("/delete/:id",authorizeRole,deleteBill);

export default router;
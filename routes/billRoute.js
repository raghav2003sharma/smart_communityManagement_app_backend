import {createBill,findAllBills,findBillById,updateBill,deleteBill,payBill,deleteAll,updateStatus} from "../controllers/billController.js";
import {authorizeRole} from "../middlewares/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/create",authorizeRole('admin'),createBill);
router.get("/find",findAllBills);
router.get("/find-bill",findBillById);
router.put("/update",authorizeRole('admin'),updateBill);
router.delete("/delete",authorizeRole('admin'),deleteBill);
router.post("/pay",payBill);
router.delete("/delete-all",authorizeRole('admin'),deleteAll);
router.patch("/update-status",updateStatus)

export default router;
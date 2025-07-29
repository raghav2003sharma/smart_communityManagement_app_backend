import {createEvent,findAllEvents,findEventById,updateEvent,deleteEvent} from "../controllers/eventController.js";
import express from "express";
import { authorizeRole } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/create",authorizeRole("admin"),createEvent);
router.get("/find",findAllEvents);
router.get("/find/:id",findEventById);
router.put("/update/:id",updateEvent);
router.delete("/delete/:id",authorizeRole("admin"),deleteEvent);

export default router;
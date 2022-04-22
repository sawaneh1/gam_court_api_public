import express from "express";
import sendCodeController from "../controllers/sendCodeController.js";

const router = express.Router();
router.post("/sendcode", sendCodeController);

export default router;

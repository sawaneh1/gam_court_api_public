import express from "express";
import {
  createCase,
  getCases,
  getCase,
} from "../controllers/caseController.js";
import { allowIfLoggedin } from "../controllers/userController.js";

const router = express.Router();
router.post("/creatcase", allowIfLoggedin, createCase);
router.get("/cases", allowIfLoggedin, getCases);
router.get("/case:caseId", allowIfLoggedin, getCase);
export default router;

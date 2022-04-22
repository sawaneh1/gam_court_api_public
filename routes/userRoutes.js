import express from "express";
// import userController from "../controllers/userController.js"

import {
  login,
  allowIfLoggedin,
  signup,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();
router.post("/signup", signup);

router.post("/login", login);

router.get("/user/:userId", allowIfLoggedin, getUser);

router.get("/users", allowIfLoggedin, getUsers);

router.put("/user/:userId", updateUser);

// router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

export default router;

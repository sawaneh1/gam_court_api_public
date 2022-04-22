// server/controllers/userController.j
import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import roles from "../roles/roles.js";

// async function hashPassword(password) {
//   return await bcrypt.hash(password, 10);
// }

// async function validatePassword(plainPassword, hashedPassword) {
//   return await bcrypt.compare(plainPassword, hashedPassword);
// }

export const signup = async (req, res, next) => {
  const {
    name,
    phone,
    judge_or_clerk_name,
    email,
    password,
    role,
    adminToken,
  } = req.body;

  try {
    console.log(req.body);
    const oldUser = await User.findOne({ email });
    // const hashedPassword = await hashPassword(password);

    // const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      phone,
      judge_or_clerk_name,
      email,
      password,
      role: role || "clerk",
      adminToken,
    });
    newUser.password = bcrypt.hashSync(password, 12);
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    if (newUser.role == "judge") {
      if (
        newUser.adminToken == "" ||
        newUser.adminToken !== process.env.adminToken
      )
        return res
          .status(403)
          .json({ message: "you are not allowed to sign as a judge" });
    }
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    newUser.accessToken = accessToken;
    await newUser.save();
    res.json({
      data: newUser,
      accessToken,
    });
  } catch (error) {
    next(error);
    console.log("this an erro", error.message);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json("email does not exist");
    // const validPassword = await validatePassword(password, user.password);
    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) return next(new Error("Password is not correct"));
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await User.findByIdAndUpdate(user._id, { accessToken });
    res.status(200).json({
      data: user,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    data: users,
  });
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return next(new Error("User does not exist"));
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const update = req.body;
    const userId = req.params.userId;
    await User.findByIdAndUpdate(userId, update);
    const user = await User.findById(userId);
    res.status(200).json({
      data: user,
      message: "User has been updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "User has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    console.log("thi coming.... from allowislogin", res.locals.loggedInUser);
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route",
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

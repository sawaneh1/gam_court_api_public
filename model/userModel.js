import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },

  judge_or_clerk_name: {
    type: String,
    unique: true,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

  role: {
    type: String,
    default: "clerk",
    enum: ["clerk", "judge"],
    required: true,
  },
  accessToken: {
    type: String,
  },
  adminToken: {
    type:String
  }
});
const User = mongoose.model("user", UserSchema);
export default User;

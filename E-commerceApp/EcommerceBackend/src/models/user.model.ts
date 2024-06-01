import mongoose, { Schema } from "mongoose";
import validator from "validator";

interface IUser extends Document {
    _id: string,
    naem: string,
    email: string,
    photo: string,
    role: "admin" | "user",
    gender: "male" | "female",
    dob: Date,
    createdAt: Date,
    updatedAt: Date,
    age: number
}

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    email: {
      type: String,
      unique: [true, "Enter already Exists"],
      required: [true, "Please enter Email"],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Please add Photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    dob: {
      type: Date,
      required: [true, "Please enter Date of birth"],
    },
  },
  { timestamps: true }
);

userSchema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getMonth() < dob.getMonth())
  ) {
    age--;
  }

  return age;
});

export const User = mongoose.model("User", userSchema);

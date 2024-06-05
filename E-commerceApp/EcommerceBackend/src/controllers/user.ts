import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, _id, photo, gender, dob } = req.body;

    let user = await User.findById(_id);

    if (user) {
      res.status(200).json({
        success: true,
        message: `Welcome ${user.name}`,
      });
    }

    if (!_id || !name || !email || !photo || !gender || !dob) {
      return next(new ErrorHandler("Please add all fields", 400));
    }

    user = await User.create({
      name,
      email,
      _id,
      photo,
      gender,
      dob: new Date(dob),
    });

    console.log(name, email, _id, photo, gender, dob);

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.name}`,
    });
  }
);

export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json({
    success: true,
    users,
  });
});

export const getUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorHandler("Invalid Id", 404));
  }

  return res.status(200).json({
    success: true,
    user,
  });
});


export const deleteUser = TryCatch(async (req, res, next)=>{
  const id = req.params.id;

  const user = await User.findById(id);

  if(!user){
    return next(new ErrorHandler("Invalid Id", 404))
  }

  await user.deleteOne();

  res.status(200).json(
    {
      success: true,
      message: "User deleted Successfully"
    }
  )
})

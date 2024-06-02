import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";
import { NewUserRequestBody } from "../types/types.js";

export const newUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, _id, photo, gender, dob } = req.body;
    console.log( name,
        email,
        _id,
        photo,
        gender,);
    

    const user = await User.create({
      name,
      email,
      _id,
      photo,
      gender,
      dob: new Date(dob),
    });


   console.log(name, email, _id, photo, gender, dob);
   

    return res.status(200).json({
      success: true,
      message: `Welcome, ${user.name}`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

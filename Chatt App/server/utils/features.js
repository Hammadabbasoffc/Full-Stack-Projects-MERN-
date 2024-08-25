import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import cloudinary from "cloudinary";  // Make sure you import cloudinary if not already imported elsewhere
import {getBase64, getSockets } from '../lib/helper.js'



const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,  // Fixed maxAge to be in milliseconds (15 days)
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "Chatt" })
    .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("chatt-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const usersSocket = getSockets(users);  // Assuming you have a getSockets function implemented elsewhere
  io.to(usersSocket).emit(event, data);
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),  // Assuming getBase is a function that extracts the file base64 or path
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));

    return formattedResults;
  } catch (error) {
    throw new Error("Error uploading files to cloudinary: " + error.message);
  }
};

export { connectDB, sendToken, emitEvent, uploadFilesToCloudinary, cookieOptions };

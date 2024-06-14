import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
    },
    photo: {
      type: String,
      required: [true, "Please enter the photo"],
    },
    price: {
      type: Number,
      required: [true, "please enter the price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter the stock"],
    },
    category: {
      type: String,
      required: [true, "Please enter the stock"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);

import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { Product } from "../models/product.model.js";
import { rm } from "fs";

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, category, price, stock } = req.body;
    const photo = req.file;

    if (!photo) return next(new ErrorHandler("Please add photo", 400));

    if (!name || !category || !price || !stock) {
      rm(photo.path, () => {
        console.log("Deleted");
      });
      return next(new ErrorHandler("Please add all fields", 400));
    }
    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo.path,
    });

    return res.status(200).json({
      success: true,
      message: "Product is created",
    });
  }
);


export const getlatestProducts = TryCatch(async(req, res, next)=>{
    const products = await Product.find({}).sort({createdAt: -1}).limit(5)

    return res.status(200).json({
        success: true,
        products
    })
});

export const getAllCategories = TryCatch(async(req, res, next)=>{
    const categories = await Product.distinct("category")

    return res.status(200).json({
        success: true,
        categories
    })
});


export const getAdminProducts = TryCatch(async(req, res, next)=>{
    const products = await Product.find({})

    return res.status(200).json({
        success: true,
        products
    })
});


export const getSingleProduct = TryCatch(async(req, res, next)=>{
    const id = req.params.id
    const product = await Product.findById(id)

    if(!product) return next(new ErrorHandler("Product not found", 404));

    return res.status(200).json({
        success: true,
        product
    })
});



import { NextFunction, Request, Response } from "express"

export const errorMiddleware = (err:Error,req:Request, res:Response, next:NextFunction)=>{
    return res.status(400).json({
        success: true,
        message: "Some Error"
    })
}
import express, { Application,Response,Request,NextFunction } from "express";
import jwt from "jsonwebtoken"
import {Gigs} from "../models/gigs.models"

export const ValidateGig = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const price = req.body.Price
        if(price <= 0){
            return res.status(200).json({
            message : "Price must be a positive number"
            })
        }
        next()
    }catch(e){
        const errorMessage = e instanceof Error ? e.message : "an unknown error occured"
        console.log("validation error : ",errorMessage)
        return res.status(400).json({
            error : errorMessage
        })
    }
        
}

export const authz = async (req:Request,res:Response,next:NextFunction) => {
    const token = req.cookies?.token
    if(!token){
        return res.status(401).json({
            message : "No token provided"
        })
    }
    try{
        const verify=jwt.verify(token,process.env.JWT_SECRET as string) as{role:string}
        if(verify.role !== "Freelancer"){
            return res.status(403).json({
                message : "Access denied"
            })
        }
        next()
    }catch(e){
        return res.status(401).json({
            message : "Invalid token"
        })
    }
}
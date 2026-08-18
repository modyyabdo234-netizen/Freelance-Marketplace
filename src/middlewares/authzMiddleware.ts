import express, { Application,Response,Request,NextFunction } from "express";
import jwt from "jsonwebtoken"
import {Gigs} from "../models/gigs.models"

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
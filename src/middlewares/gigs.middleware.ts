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


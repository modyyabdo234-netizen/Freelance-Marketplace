import express, { Application,Response,Request,NextFunction } from "express";
import jwt from "jsonwebtoken"
import {Gigs} from "../models/gigs.models"



export const authz = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = req.cookies?.token;

    if (!token && req.headers.authorization) {
        if (req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        } else {
            token = req.headers.authorization;
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };

        if (verify.role !== "Freelancer") {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        (req as any).user = verify;
        next();
    } catch (e) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

export const authzClients = async (req:Request,res:Response,next:NextFunction) => {
    let token = req.cookies?.token
    if (!token && req.headers.authorization) {
        if (req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        } else {
            token = req.headers.authorization;
        }
    }
    if(!token){
        return res.status(401).json({
            message : "No token provided"
        })
    }
    try{
        const verify=jwt.verify(token,process.env.JWT_SECRET as string) as{id : string, role:string}
        if(verify.role !== "Client"){
            return res.status(403).json({
                message : "Clients only can have favorites"
            })
        }
        (req as any).user = verify;
        next()
    }catch(e){
        return res.status(401).json({
            message : "Invalid token"
        })
    }
}
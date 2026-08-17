import { User }  from "../models/User_model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
    try {
        const { full_name, email, password, role } = req.body;
    
    if ( !full_name  || !email || !password || !role )
        { return res.status(400).json({message:"All fields are required"})}
    
        const existingUser = await User.findOne({ email });
    
    if (existingUser)
        {return res.status(409).json({message: "Email already exists"});}
    
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
                full_name,
                email,
                password: hashedPassword,
                role
            });
        return res.status(201).json({
                message: "User registered successfully",
                user: {
                id: user._id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
                }
            });
    
    } // try


catch(error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
        message: "Internal server error"
    });
}};


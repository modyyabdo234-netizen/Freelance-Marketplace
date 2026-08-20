import { Request, Response } from 'express';
import { User } from '../models/User_model';
import { Gigs } from '../models/gigs.models';

export const addFavorite = async (req:Request , res:Response) => {
    try {
        const userId = req.user?.id
        const gigId = req.params.id
        if(!userId){
            return res.status(404).json({
                message : "User not found"
            })
        }
        if(!gigId){
            return res.status(404).json({
                message : "Gig ID is required"
            })
        }
        const updateUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { favorites: gigId }},
            { new: true }
        )
        if (!updateUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message : "Added to favorites"
        })

    }catch(e){
        const errorMessage = e instanceof Error ? e.message : "an unknown error occured"
        console.log("validation error : ",errorMessage)
        return res.status(400).json({
            error : errorMessage
        })
    }
}
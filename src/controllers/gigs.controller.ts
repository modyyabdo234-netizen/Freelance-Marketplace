import express, { Application,Response,Request } from "express";
import {Gigs} from "../models/gigs.models"

export const getEntireGigs = async (req:Request,res:Response) => {
    try{
        const crew = await Gigs.find()
        return res.status(200).json({
            message : 'All Gigs :',
            crew
        })
    }catch(e){
        const errorMessage = e instanceof Error ? e.message : "an unknown error occured"
        console.log("validation error : ",errorMessage)
        return res.status(400).json({
            error : errorMessage
        })
    }
    
}

export const deleteGigs =  async (req:Request,res:Response) =>{
    try{
        const gigId = await Gigs.findById(req.params.id)
        if(!gigId){
            return res.status(404).json({
                message : "No gig with this id"
            })
        }
        const deletedGig = await Gigs.deleteOne(
            {_id : req.params.id },
            
        )
        res.status(200).json({
        message : 'Gig deleted successfully',
    })
    }catch(e){
        const errorMessage = e instanceof Error ? e.message : "an unknown error occured"
        console.log("validation error : ",errorMessage)
        return res.status(400).json({
            error : errorMessage
        })
    }
}

export const updateGigs = async (req:Request,res:Response) => {
    try{
        const {Title, Description, Price, Category} = req.body
        const update : any ={}
        if(Title){
            update.Title = Title
        }
        if(Description){
            update.Description = Description
        }
        if(Price){
            update.Price = Price
        }
        if(Category){
            update.Category = Category
        }
        const updatedMember = await Gigs.updateOne(
            {_id : req.params.id },
            {$set : update},
        )
        res.status(200).json({
        message : 'Gigs updated successfully',
        updatedMember
    })
    }catch(e){
        const errorMessage = e instanceof Error ? e.message : "an unknown error occured"
        console.log("validation error : ",errorMessage)
        return res.status(400).json({
            error : errorMessage
        })
    }
}


export const createGig = async (req:Request,res:Response) => {
    try {
        const nemwGig = await Gigs.create(req.body)

        return res.status(201).json({
            message : "Gig is created successfully ",
            nemwGig
        })
    }catch(e){
        const errorMessage = e instanceof Error ? e.message : "an unknown error occured"
        console.log("validation error : ",errorMessage)
        return res.status(400).json({
            error : errorMessage
        })
    }
}


export const filterAndSearchGig = async (req:Request,res:Response) => {
    try{
        const {Title,PriceMin,PriceMax, Category,FreelancerName }= req.query
        const filter:any = {}
        if(Title && typeof Title === 'string'){
            filter.Title = Title 
        }
        if(Category && typeof Category === 'string'){
            filter.Category = Category
        }
        if(FreelancerName && typeof FreelancerName === 'string'){
            filter.FreelancerName = FreelancerName 
        }
        if(PriceMin || PriceMax ){
            filter.Price = {}
            if(PriceMin){
                filter.Price.$gte = Number(PriceMin)
            }
            if(PriceMax){
                filter.Price.$lte = Number(PriceMax)
            }
        }
        const gigs = await Gigs.find(filter)
        res.status(200).json({
            message : " The filtred gigs : ",
            gigs

        })


    }catch(e){
        const errorMessage = e instanceof Error ? e.message : "an unknown error occured"
        console.log("validation error : ",errorMessage)
        return res.status(400).json({
            error : errorMessage
        })
    }
    
}





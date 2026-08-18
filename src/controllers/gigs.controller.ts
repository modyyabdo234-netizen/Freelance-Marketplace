import express, { Application,Response,Request } from "express";
import {Gigs} from "../models/gigs.models"
import Order from '../models/orderModel';


export const getEntireGigs = async (req:Request,res:Response) => {
    try{
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page - 1) * limit
        const totalGigs = await Gigs.countDocuments();
        const gigs = await Gigs.find().skip(skip).limit(limit)

        const totalPages = Math.ceil(totalGigs / limit);
        return res.status(200).json({
            message : 'All Gigs :',
            pagination: {
                totalGigs,
                totalPages,
                currentPage: page,
                limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            },
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

export const deleteGigs =  async (req:Request,res:Response) =>{
    try{
        const gigId = await Gigs.findById(req.params.id)
        if(!gigId){
            return res.status(404).json({
                message : "No gig with this id"
            })
        }
        const pendingorder = await Order.findOne({
            gig : req.params.id,
            status: {$ne: 'Completed'}
        })
        if(pendingorder){
            return res.status(400).json({
                message : "There is an active order for this gig - can't be deleted -"
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





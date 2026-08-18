import { Request, Response } from 'express';
import { Review } from '../models/Review';
import  Order  from '../models/orderModel';

export const review = async (req: Request, res: Response)=>{

    try{
    const { orderId, rating, comment } = req.body;
    if (!orderId || !rating || !comment) {
    return res.status(400).json({
        message: "All fields are required "
    });
    }
    
    if (rating < 1 || rating > 5) {
    return res.status(400).json({
        message: "You can only rate from 1 to 5"
    });
    }
    const order = await Order.findById(orderId);
    if (!order) {
    return res.status(404).json({
        message: "Order not exist"
    });
    }

    if (order.status !== "Completed") {
    return res.status(400).json({
        message: "You can rate the only completed order"})
    }

    const newReview = await Review.create({
      gig: order.gig,     
      client: order.client, 
    order: orderId,
    rating,
    comment
    });

    return res.status(201).json({
    message: "تم إضافة التقييم بنجاح",
    review: newReview
    });

    }//try
    catch(error)
    {        console.error("Review ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"})
    }

}



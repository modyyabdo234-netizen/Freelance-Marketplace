import { Request, Response } from 'express';
import { Review } from '../models/Review';
import Order from '../models/orderModel';

export const review = async (req: Request, res: Response) => {
    try {
    const { orderId, rating, comment } = req.body;
    
    const clientId = (req as any).user?.id;

    if (!orderId || !rating || !comment) {
    return res.status(400).json({
        message: "All fields are required"
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
        message: "Order does not exist"
    });
    }

    if (order.client.toString() !== clientId) {
    return res.status(403).json({
        message: "You are not authorized to review this order"
    });
    }

    if (order.status !== "Completed") {
    return res.status(400).json({
        message: "You can rate only completed orders"
    });
    }

    const newReview = await Review.create({
    gig: order.gig,     
    client: clientId, 
    order: orderId,
    rating,
    comment
    });

    return res.status(201).json({
    message: "Review complete",
    review: newReview
    });

}//try

catch (error: any) {
    console.error("Review ERROR:", error);

    if (error.code === 11000) {
    return res.status(400).json({
        message: "You have already reviewed this order"
    });
    }

    return res.status(500).json({
    message: "Internal server error"
    });
}
};
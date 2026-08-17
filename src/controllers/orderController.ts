import { Request, Response } from 'express';
import Order from '../models/orderModel';




export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
  
    if (req.user?.role !== 'Client') {
      res.status(403).json({ message: 'Only clients can create orders' });
      return;
    }

    const { gigId, freelancerId, price } = req.body;

    
    if (!gigId || !freelancerId || price === undefined || price === null) {
      res.status(400).json({ message: 'gigId, freelancerId, and price are required' });
      return;
    }

   
    if (req.user.id === freelancerId) {
      res.status(400).json({ message: 'You cannot create an order for yourself' });
      return;
    }

    
    if (typeof price !== 'number' || price <= 0) {
      res.status(400).json({ message: 'Price must be greater than zero' });
      return;
    }

    const newOrder = await Order.create({
      gig: gigId,
      client: req.user.id,
      freelancer: freelancerId,
      price,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};


export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    let filter = {};
    if (req.user?.role === 'Client') {
      filter = { client: req.user.id };
    } else if (req.user?.role === 'Freelancer') {
      filter = { freelancer: req.user.id };
    }

    const orders = await Order.find(filter);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};


export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {

    if (req.user?.role !== 'Freelancer') {
      res.status(403).json({ message: 'Only freelancers can update status' });
      return;
    }

    const { status } = req.body;
    const orderId = req.params.id;

    if (!['Pending', 'Accepted', 'Completed'].includes(status)) {
      res.status(400).json({ message: 'Invalid status. Must be Pending, Accepted, or Completed' });
      return;
    }

    
    const existingOrder = await Order.findOne({ _id: orderId, freelancer: req.user.id });

    if (!existingOrder) {
      res.status(404).json({ message: 'Order not found or unauthorized' });
      return;
    }

    
    if (existingOrder.status === 'Completed') {
      res.status(400).json({ message: 'Completed orders cannot be modified' });
      return;
    }

    // (Pending -> Accepted -> Completed)
    if (existingOrder.status === 'Pending' && status !== 'Accepted') {
      res.status(400).json({ message: 'Pending orders can only be moved to Accepted' });
      return;
    }

    if (existingOrder.status === 'Accepted' && status !== 'Completed') {
      res.status(400).json({ message: 'Accepted orders can only be moved to Completed' });
      return;
    }

    existingOrder.status = status;
    await existingOrder.save();

    res.status(200).json(existingOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
};
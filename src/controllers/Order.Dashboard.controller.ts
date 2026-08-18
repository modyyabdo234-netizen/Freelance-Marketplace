import { Request, Response } from 'express';
import { User } from '../models/user.model';
import Order from '../models/order.model';
import { Gigs as Gig } from '../models/gig.model';

/**
 * Controller to fetch Dashboard Statistics for Freelancer and Client roles
 */
export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        // Extract authenticated user ID and role attached by authMiddleware
        const userId = (req as any).user?.id || (req as any).user?._id;
        const role = (req as any).user?.role;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        if (role === 'Freelancer') {
            // 1. Total Gigs created by freelancer (Field is 'Owner' with capital O)
            const totalGigs = await Gig.countDocuments({ Owner: userId });

            // 2. Retrieve all gig IDs created by this freelancer
            const freelancerGigs = await Gig.find({ Owner: userId }).select('_id');
            const gigIds = freelancerGigs.map((g: any) => g._id);

            // 3. Count orders received on freelancer's gigs by status (Capitalized status)
            const totalOrders = await Order.countDocuments({ gig: { $in: gigIds } });
            const pendingOrders = await Order.countDocuments({ gig: { $in: gigIds }, status: 'Pending' });
            const acceptedOrders = await Order.countDocuments({ gig: { $in: gigIds }, status: 'Accepted' });
            const completedOrders = await Order.countDocuments({ gig: { $in: gigIds }, status: 'Completed' });

            // 4. Calculate total revenue earned from completed orders
            const completedOrdersList = await Order.find({ gig: { $in: gigIds }, status: 'Completed' });
            const totalRevenue = completedOrdersList.reduce((acc: number, order: any) => {
                return acc + (order.price || 0);
            }, 0);

            return res.status(200).json({
                message: "Freelancer dashboard stats fetched successfully",
                role: 'Freelancer',
                stats: {
                    totalGigs,
                    totalOrders,
                    pendingOrders,
                    acceptedOrders,
                    completedOrders,
                    totalRevenue
                }
            });
        } else {
            // Client Statistics
            const totalOrders = await Order.countDocuments({ client: userId });
            const pendingOrders = await Order.countDocuments({ client: userId, status: 'Pending' });
            const acceptedOrders = await Order.countDocuments({ client: userId, status: 'Accepted' });
            const completedOrders = await Order.countDocuments({ client: userId, status: 'Completed' });

            // Calculate total spent on completed orders
            const completedOrdersList = await Order.find({ client: userId, status: 'Completed' });
            const totalSpent = completedOrdersList.reduce((acc: number, order: any) => {
                return acc + (order.price || 0);
            }, 0);

            return res.status(200).json({
                message: "Client dashboard stats fetched successfully",
                role: 'Client',
                stats: {
                    totalOrders,
                    pendingOrders,
                    acceptedOrders,
                    completedOrders,
                    totalSpent
                }
            });
        }
    } catch (error) {
        console.error("DASHBOARD STATS ERROR:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

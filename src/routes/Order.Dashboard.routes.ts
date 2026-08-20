import { Router } from "express";
import { getDashboardStats } from "../controllers/Order.Dashboard.controller";
import {protect} from "../middlewares/authMiddleware";

const router = Router();

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get dashboard statistics for the authenticated user (Freelancer or Client)
 * @access  Private (Requires valid JWT)
 */
router.get("/stats", protect, getDashboardStats);

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics for authenticated user (Freelancer or Client)
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Freelancer dashboard stats fetched successfully"
 *                 role:
 *                   type: string
 *                   enum: [Freelancer, Client]
 *                   example: "Freelancer"
 *                 stats:
 *                   type: object
 *                   description: Object holding role-based statistics
 *             examples:
 *               FreelancerStats:
 *                 summary: Example response for Freelancer
 *                 value:
 *                   message: "Freelancer dashboard stats fetched successfully"
 *                   role: "Freelancer"
 *                   stats:
 *                     totalGigs: 5
 *                     totalOrders: 12
 *                     pendingOrders: 3
 *                     acceptedOrders: 4
 *                     completedOrders: 5
 *                     totalRevenue: 750
 *               ClientStats:
 *                 summary: Example response for Client
 *                 value:
 *                   message: "Client dashboard stats fetched successfully"
 *                   role: "Client"
 *                   stats:
 *                     totalOrders: 8
 *                     pendingOrders: 2
 *                     acceptedOrders: 1
 *                     completedOrders: 5
 *                     totalSpent: 420
 *       401:
 *         description: Unauthorized access - Invalid or missing token
 *       500:
 *         description: Internal server error
 */

export default router;

import { Router } from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController';
import { protect } from '../middlewares/authMiddleware';
import {review} from "../controllers/review.controller"
const router = Router();


router.use(protect);


router.post('/', createOrder);
router.get('/', getOrders);
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order (Clients only)
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gigId
 *               - freelancerId
 *               - price
 *             properties:
 *               gigId:
 *                 type: string
 *                 format: objectid
 *               freelancerId:
 *                 type: string
 *                 format: objectid
 *               price:
 *                 type: number
 *             example:
 *               gigId: "65abc9876543210fedcba321"
 *               freelancerId: "65abc7778889990001112223"
 *               price: 150
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid input or user tried ordering from self
 *       403:
 *         description: Only clients can create orders
 *       500:
 *         description: Error creating order
 *   get:
 *     summary: get user orders
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Error fetching orders
 */




router.patch('/:id/status', updateOrderStatus);
/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Update order status (Freelancers only)
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectid
 *         description: order id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Accepted, Completed]
 *             example:
 *               status: "Accepted"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid status or invalid transition
 *       403:
 *         description: Only freelancers can update status
 *       404:
 *         description: Order not found or unauthorized
 *       500:
 *         description: Error updating order
 */

router.post("/review",review)
/**
 * @swagger
 * /orders/review:
 *   post:
 *     summary: Submit a review for a completed order (Clients only)
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - rating
 *               - comment
 *             properties:
 *               orderId:
 *                 type: string
 *                 format: objectid
 *                 description: order id
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Rating score between 1 and 5
 *               comment:
 *                 type: string
 *                 description: Review text
 *             example:
 *               orderId: "65abc5556667778889990001"
 *               rating: 5
 *               comment: "Great experience! High performance code and fast delivery."
 *     responses:
 *       201:
 *         description: Review submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review complete"
 *                 review:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Missing fields, invalid rating range, order not completed, or already reviewed
 *       403:
 *         description: Not authorized to review this order
 *       404:
 *         description: Order does not exist
 *       500:
 *         description: Internal server error
 */

export default router;
import { Router } from "express";
import { register,login } from "../controllers/auth.controller";

const router = Router()


router.post("/register",register)
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: "jana ahmed"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jana@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 enum: [Freelancer, Client]
 *                 example: "Freelancer"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: All fields are required
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.post("/login", login);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: user login 
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: "jana@example.com"
 *               password: "password123"    
 *     responses:
 *       200:
 *         description: login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: All fields are required
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */


export default router;
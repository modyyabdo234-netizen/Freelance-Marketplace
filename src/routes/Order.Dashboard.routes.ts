import { Router } from "express";
import { getDashboardStats } from "../controllers/Order.Dashboard.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get dashboard statistics for the authenticated user (Freelancer or Client)
 * @access  Private (Requires valid JWT)
 */
router.get("/stats", authMiddleware, getDashboardStats);

export default router;

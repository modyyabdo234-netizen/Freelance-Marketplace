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

export default router;

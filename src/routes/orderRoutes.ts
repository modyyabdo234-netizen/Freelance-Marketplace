import { Router } from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();


router.use(protect);


router.post('/', createOrder);


router.get('/', getOrders);


router.patch('/:id/status', updateOrderStatus);

export default router;
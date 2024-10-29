import { Router } from 'express';
import { createOrder } from '../controllers/order';
import { orderCreationValidation } from '../middlewares/validation';

const router = Router();

router.post('/', orderCreationValidation, createOrder);

export default router;

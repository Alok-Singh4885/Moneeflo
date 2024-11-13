import express from 'express';
import * as userController from '../controller/userController';
import * as productController from '../controller/productController';
import { authMiddleware } from '../middleware/authMiddleware';
import { joiHandler } from '../../joiValidators';
import * as userValidator from '../validators/userValidator';

const router = express.Router();

router.post('/users/signup', joiHandler(userValidator.createUserSchema), userController.registerUser);
router.post('/users/login', joiHandler(userValidator.loginSchema), userController.loginUser);

router.post('/products/add', authMiddleware, joiHandler(userValidator.addProductSchema), productController.addProducts);
router.get('/quotations', authMiddleware, productController.viewQuotations);

export default router;

import PaymentsController from '@/controllers/payments.controller';
import { PaymentDto } from '@/dtos/payments.dto';
import { CreateProductDto, ProductDto } from '@/dtos/products.dto';
import { Routes } from '@/interfaces/routes.interface';
import minimumPermissionLevelRequried from '@/middlewares/permission.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Role } from '@prisma/client';
import { Router } from 'express';

class PaymentsRoute implements Routes {
    public path: string = '/api/payments';
    public router = Router();
    public paymentsController = new PaymentsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(minimumPermissionLevelRequried(Role.USER));
        this.router.get('/', this.paymentsController.getAllPayments);
        this.router.get('/:id', this.paymentsController.getPayment);
        this.router.post('/', validationMiddleware(PaymentDto, 'body'), this.paymentsController.createPayment);
        this.router.put('/:id', validationMiddleware(PaymentDto, 'body', true), this.paymentsController.updatePayment);
        this.router.delete('/:id', this.paymentsController.deletePayment);
    }
}

export default PaymentsRoute;

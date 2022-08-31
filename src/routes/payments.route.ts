import PaymentsController from '@/controllers/payments.controller';
import { PaymentDto } from '@/dtos/payments.dto';
import { CreateProductDto, ProductDto } from '@/dtos/products.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class PaymentsRoute implements Routes {
    public path: string = '/api/payments';
    public router = Router();
    public paymentsController = new PaymentsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.paymentsController.getAllPayments);
        this.router.get('/:id', this.paymentsController.getPayment);
        this.router.post('/', validationMiddleware(PaymentDto, 'body'), this.paymentsController.createPayment);
        this.router.put('/:id', validationMiddleware(PaymentDto, 'body', true), this.paymentsController.updatePayment);
        this.router.delete('/:id', this.paymentsController.deletePayment);
    }
}

export default PaymentsRoute;

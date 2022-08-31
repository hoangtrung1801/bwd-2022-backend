import OrdersController from '@/controllers/orders.controller';
import { OrderDto } from '@/dtos/orders.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class OrdersRoute implements Routes {
    public path: string = '/api/orders';
    public router = Router();
    public ordersController = new OrdersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.ordersController.getAllOrders);
        this.router.get('/:id', this.ordersController.getOrder);
        this.router.post('/', validationMiddleware(OrderDto, 'body'), this.ordersController.createOrder);
        this.router.put('/:id', validationMiddleware(OrderDto, 'body', true), this.ordersController.updateOrder);
        this.router.delete('/:id', this.ordersController.deleteOrder);
    }
}

export default OrdersRoute;

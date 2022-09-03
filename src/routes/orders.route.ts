import OrdersController from '@/controllers/orders.controller';
import { CreateOrderDto, OrderDto } from '@/dtos/orders.dto';
import { Routes } from '@/interfaces/routes.interface';
import minimumPermissionLevelRequried from '@/middlewares/permission.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Role } from '@prisma/client';
import { Router } from 'express';

class OrdersRoute implements Routes {
    public path: string = '/api/orders';
    public router = Router();
    public ordersController = new OrdersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(minimumPermissionLevelRequried(Role.USER));
        this.router.get('/', this.ordersController.getAllOrders);
        this.router.get('/:id', this.ordersController.getOrder);
        this.router.post('/', validationMiddleware(CreateOrderDto, 'body'), this.ordersController.createOrder);
        this.router.put('/:id', validationMiddleware(OrderDto, 'body', true), this.ordersController.updateOrder);
        this.router.delete('/:id', this.ordersController.deleteOrder);
    }
}

export default OrdersRoute;

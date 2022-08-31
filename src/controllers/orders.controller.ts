import { CreateCategoryDto } from '@/dtos/categories.dto';
import { OrderDto } from '@/dtos/orders.dto';
import StatusCode from '@/interfaces/status.enum';
import OrdersService from '@/services/orders.service';
import { Category, Order } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

class OrdersController {
    public ordersService = new OrdersService();

    public getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const allOrders = await this.ordersService.findAll();

            res.status(200).json({
                status: StatusCode.SUCCESS,
                data: allOrders,
            });
        } catch (error) {
            next(error);
        }
    };

    public getOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const orderId = String(req.params.id);
            const order = await this.ordersService.findById(orderId);

            res.status(200).json({
                status: StatusCode.SUCCESS,
                data: order,
            });
        } catch (error) {
            next(error);
        }
    };

    public createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const orderData: OrderDto = req.body;
            const order: Order = await this.ordersService.create(orderData);

            res.status(201).json({
                status: StatusCode.SUCCESS,
                data: order,
            });
        } catch (error) {
            next(error);
        }
    };

    public updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const orderData: OrderDto = req.body;
            const orderId = String(req.params.id);
            const order: Order = await this.ordersService.update(orderId, orderData);

            res.status(200).json({
                status: StatusCode.SUCCESS,
                data: order,
            });
        } catch (error) {
            next(error);
        }
    };

    public deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const orderId = String(req.params.id);
            const order: Order = await this.ordersService.delete(orderId);

            res.status(200).json({
                status: StatusCode.SUCCESS,
                data: order,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default OrdersController;

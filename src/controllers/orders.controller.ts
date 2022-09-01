import { CreateOrderDto, OrderDto } from '@/dtos/orders.dto';
import StatusResponse from '@/interfaces/status.enum';
import OrderItemsService from '@/services/orderItems.service';
import OrdersService from '@/services/orders.service';
import PaymentsService from '@/services/payments.service';
import { Order, OrderItem, Payment, PaymentStatus } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

class OrdersController {
    public ordersService = new OrdersService();
    public orderItemsService = new OrderItemsService();
    public paymentService = new PaymentsService();

    public getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const allOrders = await this.ordersService.findAll();

            res.status(200).json({
                status: StatusResponse.SUCCESS,
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
                status: StatusResponse.SUCCESS,
                data: order,
            });
        } catch (error) {
            next(error);
        }
    };

    public createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const orderData: CreateOrderDto = req.body;

            // create payment
            const payment: Payment = await this.paymentService.create({
                status: PaymentStatus.WAITING,
            });

            // create order items
            const orderItems: OrderItem[] = await Promise.all(orderData.items.map(async item => await this.orderItemsService.create(item)));

            // create order
            const order: Order = await this.ordersService.create(
                orderData,
                orderItems.map(item => item.id),
                payment.id,
            );

            // update payment with orderId
            await this.paymentService.update(payment.id, {
                orderID: order.id,
            });

            // update orderItems with orderId
            await Promise.all(orderItems.map(async item => await this.orderItemsService.update(item.id, { orderID: order.id })));

            res.status(201).json({
                status: StatusResponse.SUCCESS,
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
                status: StatusResponse.SUCCESS,
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
                status: StatusResponse.SUCCESS,
                data: order,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default OrdersController;

import { OrderDto } from '@/dtos/orders.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Order, Payment, PrismaClient } from '@prisma/client';
import { isEmpty } from 'class-validator';

class OrdersService {
    public orders = new PrismaClient().order;
    public payments = new PrismaClient().payment;

    public async findAll(): Promise<Order[]> {
        const allOrders = await this.orders.findMany({
            include: {
                items: true,
                payment: true,
            },
        });
        return Promise.resolve(allOrders);
    }

    public async findById(orderId: string): Promise<Order> {
        if (isEmpty(orderId)) throw new HttpException(400, 'orderId is empty');

        const foundOrder = await this.orders.findUnique({ where: { id: orderId }, include: { items: true, payment: true } });
        if (!foundOrder) throw new HttpException(409, "Order doesn't exist");

        return foundOrder;
    }

    public async create(orderData: OrderDto): Promise<Order> {
        if (isEmpty(orderData)) throw new HttpException(400, 'Order is empty');

        const { itemIDs, paymentID, total } = orderData;
        const createOrder: Order = await this.orders.create({
            data: {
                total,
                itemIDs,
                paymentID: paymentID || null,
            },
        });

        return createOrder;
    }

    public async update(orderId: string, orderData: OrderDto): Promise<Order> {
        if (isEmpty(orderData)) throw new HttpException(400, 'Order is empty');

        const foundOrder: Order = await this.orders.findUnique({ where: { id: orderId } });
        if (!foundOrder) throw new HttpException(409, "Order doesn't exist");

        const order: Order = await this.orders.update({ where: { id: orderId }, data: { ...orderData } });

        return order;
    }

    public async delete(orderId: string): Promise<Order> {
        if (isEmpty(orderId)) throw new HttpException(400, 'Order is empty');

        const foundOrder: Order = await this.orders.findUnique({ where: { id: orderId } });
        if (!foundOrder) throw new HttpException(409, "Order doesn't exist");

        const order = await this.orders.delete({ where: { id: orderId } });
        return order;
    }

    public async findByUser(userId: string): Promise<Order[]> {
        if (isEmpty(userId)) throw new HttpException(400, 'userId is empty');

        const userPayments = await this.payments.findMany({
            where: {
                userID: userId,
            },
            include: {
                order: true,
            },
        });
        const userOrders = userPayments.map(payment => payment.order);
        return userOrders;
    }
}

export default OrdersService;

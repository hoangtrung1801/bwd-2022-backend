import { CreateOrderItemDto, OrderItemDto } from '@/dtos/orderItems.dto';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';
import { OrderItem, PrismaClient } from '@prisma/client';

class OrderItemsService {
    public orderItems = new PrismaClient().orderItem;

    public async create(orderItemData: CreateOrderItemDto): Promise<OrderItem> {
        if (isEmpty(orderItemData)) throw new HttpException(400, 'Order item is empty');

        const { quantity, productID } = orderItemData;
        const orderItem = await this.orderItems.create({
            data: {
                quantity,
                productID,
            },
        });

        return orderItem;
    }

    public async update(orderItemId: string, orderItemData: OrderItemDto): Promise<OrderItem> {
        if (isEmpty(orderItemId)) throw new HttpException(400, 'orderItemId is empty');

        const orderItem = await this.orderItems.update({
            where: {
                id: orderItemId,
            },
            data: {
                ...orderItemData,
            },
        });
        return orderItem;
    }
}

export default OrderItemsService;

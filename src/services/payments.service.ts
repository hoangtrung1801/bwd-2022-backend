import { CreatePaymentDto, PaymentDto } from '@/dtos/payments.dto';
import { ProductDto } from '@/dtos/products.dto';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';
import { Payment, PrismaClient, Product, PaymentStatus } from '@prisma/client';

class PaymentsService {
    public payments = new PrismaClient().payment;

    public async findAll(): Promise<Payment[]> {
        const allPayments = await this.payments.findMany({
            // include: {
            //     order: true,
            //     user: true,
            // },
        });

        return Promise.resolve(allPayments);
    }

    public async findById(paymentId: string): Promise<Payment> {
        if (isEmpty(paymentId)) throw new HttpException(400, 'paymentId is empty');

        const foundPayment = await this.payments.findUnique({ where: { id: paymentId }, include: { order: true, user: true } });
        if (!foundPayment) throw new HttpException(409, "Payment doesn't exist");

        return foundPayment;
    }

    public async create(paymentData: CreatePaymentDto, userID: string): Promise<Payment> {
        if (isEmpty(paymentData)) throw new HttpException(400, 'Payment is empty');
        if (isEmpty(userID)) throw new HttpException(400, 'UserID is empty');

        const { status } = paymentData;
        const createProduct: Payment = await this.payments.create({
            data: {
                status,
                userID,
            },
        });

        return createProduct;
    }

    public async update(paymentId: string, paymentData: PaymentDto): Promise<Payment> {
        if (isEmpty(paymentId)) throw new HttpException(400, 'Payment is empty');

        const foundPayment: Payment = await this.payments.findUnique({ where: { id: paymentId } });
        if (!foundPayment) throw new HttpException(409, "Payment doesn't exist");

        const payment = await this.payments.update({ where: { id: paymentId }, data: { ...paymentData } });

        return payment;
    }

    public async delete(paymentId: string): Promise<Payment> {
        if (isEmpty(paymentId)) throw new HttpException(400, 'Payment is empty');

        const foundPayment: Payment = await this.payments.findUnique({ where: { id: paymentId } });
        if (!foundPayment) throw new HttpException(409, "Payment doesn't exist");

        const payment = await this.payments.delete({ where: { id: paymentId } });
        return payment;
    }

    public async findByUser(userId: string): Promise<Payment[]> {
        if (isEmpty(userId)) throw new HttpException(400, 'userId is empty');

        const userPayments = await this.payments.findMany({
            where: {
                userID: userId,
            },
        });
        return userPayments;
    }
}

export default PaymentsService;

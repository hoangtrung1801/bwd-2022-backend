import { PaymentDto } from '@/dtos/payments.dto';
import StatusResponse from '@/interfaces/status.enum';
import PaymentsService from '@/services/payments.service';
import { Payment } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

class PaymentsController {
    public productsService = new PaymentsService();

    public getAllPayments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const allPayments = await this.productsService.findAll();

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: allPayments,
            });
        } catch (error) {
            next(error);
        }
    };

    public getPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const paymentId = String(req.params.id);
            const payment: Payment = await this.productsService.findById(paymentId);

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: payment,
            });
        } catch (error) {
            next(error);
        }
    };

    public createPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // get userID
            const userID = req['user'].id;

            const paymentData: PaymentDto = req.body;
            const payment: Payment = await this.productsService.create(paymentData, userID);

            res.status(201).json({
                status: StatusResponse.SUCCESS,
                data: payment,
            });
        } catch (error) {
            next(error);
        }
    };

    public updatePayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const paymentData: PaymentDto = req.body;
            const paymentId = String(req.params.id);
            const payment: Payment = await this.productsService.update(paymentId, paymentData);

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: payment,
            });
        } catch (error) {
            next(error);
        }
    };

    public deletePayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const paymentId = String(req.params.id);
            const payment: Payment = await this.productsService.delete(paymentId);

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: payment,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default PaymentsController;

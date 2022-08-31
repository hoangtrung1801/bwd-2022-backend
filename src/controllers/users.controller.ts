import StatusResponse from '@/interfaces/status.enum';
import OrdersService from '@/services/orders.service';
import PaymentsService from '@/services/payments.service';
import { UserDto } from '@dtos/users.dto';
import { Order, Payment, User } from '@prisma/client';
import UsersService from '@services/users.service';
import { NextFunction, Request, Response } from 'express';

class UsersController {
    public userService = new UsersService();
    public orderService = new OrdersService();
    public paymentsService = new PaymentsService();

    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllUsersData: User[] = await this.userService.findAllUser();

            res.status(200).json({ status: StatusResponse.SUCCESS, data: findAllUsersData });
        } catch (error) {
            next(error);
        }
    };

    public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = String(req.params.id);
            const findOneUserData: User = await this.userService.findUserById(userId);

            res.status(200).json({ status: StatusResponse.SUCCESS, data: findOneUserData });
        } catch (error) {
            next(error);
        }
    };

    public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: UserDto = req.body;
            const user: User = await this.userService.createUser(userData);

            res.status(201).json({ status: StatusResponse.SUCCESS, data: user });
        } catch (error) {
            next(error);
        }
    };

    public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = String(req.params.id);
            const userData: UserDto = req.body;
            const user: User = await this.userService.updateUser(userId, userData);

            res.status(200).json({ status: StatusResponse.SUCCESS, data: user });
        } catch (error) {
            next(error);
        }
    };

    public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = String(req.params.id);
            const user: User = await this.userService.deleteUser(userId);

            res.status(200).json({ status: StatusResponse.SUCCESS, data: user });
        } catch (error) {
            next(error);
        }
    };

    public getUserOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = String(req.params.id);
            const userOrders: Order[] = await this.orderService.findByUser(userId);

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: userOrders,
            });
        } catch (error) {
            next(error);
        }
    };

    public getUserPayments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = String(req.params.id);
            console.log(userId);
            const userPayments: Payment[] = await this.paymentsService.findByUser(userId);

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: userPayments,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default UsersController;

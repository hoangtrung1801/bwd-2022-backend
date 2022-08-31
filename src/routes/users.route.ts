import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { UserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
    public path = '/api/users';
    public router = Router();
    public usersController = new UsersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`/`, this.usersController.getUsers);
        this.router.get(`/:id`, this.usersController.getUserById);
        this.router.get('/:id/orders', this.usersController.getUserOrders);
        this.router.get('/:id/payments', this.usersController.getUserPayments);
        this.router.post(`/`, validationMiddleware(UserDto, 'body'), this.usersController.createUser);
        this.router.put(`/:id`, validationMiddleware(UserDto, 'body', true), this.usersController.updateUser);
        this.router.delete(`/:id`, this.usersController.deleteUser);
    }
}

export default UsersRoute;

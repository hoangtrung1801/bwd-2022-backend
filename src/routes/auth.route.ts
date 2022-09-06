import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { UserDto, LoginUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import minimumPermissionLevelRequried from '@/middlewares/permission.middleware';
import { Role } from '@prisma/client';

class AuthRoute implements Routes {
    public path = '/auth';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`/signup`, validationMiddleware(UserDto, 'body'), this.authController.signUp);
        this.router.post(`/login`, validationMiddleware(LoginUserDto, 'body'), this.authController.logIn);
        this.router.post(`/logout`, this.authController.logOut);
        this.router.get('/user', this.authController.getUserFromToken);
    }
}

export default AuthRoute;

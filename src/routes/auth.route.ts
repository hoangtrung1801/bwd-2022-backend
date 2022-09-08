import AuthController from '@controllers/auth.controller';
import { LoginUserDto, UserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

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

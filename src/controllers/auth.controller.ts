import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import { UserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';
import { logger } from '@/utils/logger';
import StatusResponse from '@/interfaces/status.enum';
import { HttpException } from '@/exceptions/HttpException';

class AuthController {
    public authService = new AuthService();

    public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: UserDto = req.body;
            logger.info(userData);
            const signUpUserData: User = await this.authService.signup(userData);

            res.status(201).json({ status: StatusResponse.SUCCESS, data: signUpUserData, message: 'signup' });
        } catch (error) {
            next(error);
        }
    };

    public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: UserDto = req.body;
            const { cookie, findUser } = await this.authService.login(userData);

            // res.cookie('Authorization', cookie, {
            //     httpOnly: true,
            //     path: '/',
            //     maxAge: 60 * 60 * 24 * 7,
            // });
            res.setHeader('Set-Cookie', [cookie]);
            // res.cookie('userID', findUser.id, {
            //     expires: new Date(Date.now() + 3600000 * 24 * 7),
            // });
            res.status(200).json({ status: StatusResponse.SUCCESS, data: findUser, message: 'login' });
        } catch (error) {
            next(error);
        }
    };

    public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: User = req.user;
            const logOutUserData: User = await this.authService.logout(userData);

            res.setHeader('Set-Cookie', ['Authorization=; HttpOnly; Path=/; Secure; SameSite=None']);
            res.status(200).json({ status: StatusResponse.SUCCESS, data: logOutUserData, message: 'logout' });
        } catch (error) {
            next(error);
        }
    };

    public getUserFromToken = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user: User = req['user'];
            if (user)
                res.status(200).json({
                    status: StatusResponse.SUCCESS,
                    data: user,
                });
            else {
                // next(new HttpException(401, 'Token is required'));
                res.status(200).json({
                    status: StatusResponse.FAILED,
                });
            }
        } catch (error) {
            next(error);
        }
    };
}

export default AuthController;

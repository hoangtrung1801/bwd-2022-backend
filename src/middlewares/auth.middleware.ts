import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { PrismaClient } from '@prisma/client';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const Authorization =
            (req.cookies['Authorization'] ? req.cookies['Authorization'].split('Bearer ')[1] : null) ||
            (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

        if (Authorization) {
            const secretKey: string = SECRET_KEY;
            const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
            const userId = verificationResponse.id;

            const users = new PrismaClient().user;
            const findUser = await users.findUnique({ where: { id: userId } });

            if (findUser) {
                req.user = findUser;
                next();
            } else {
                next(new HttpException(401, 'Wrong authentication token'));
            }
        } else {
            next();
            // next(new HttpException(404, 'Authentication token missing'));
        }
    } catch (error) {
        next(new HttpException(401, 'Wrong authentication token'));
    }
};

export default authMiddleware;

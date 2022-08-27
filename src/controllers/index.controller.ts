import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

class IndexController {
    public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.status(200);
        } catch (error) {
            next(error);
        }
    };
}

export default IndexController;

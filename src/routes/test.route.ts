import { Routes } from '@/interfaces/routes.interface';
import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';

class TestRoute implements Routes {
    public path = '/test';
    public router = Router();
    public prisma = new PrismaClient();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.doing);
    }

    public doing = async (req: Request, res: Response): Promise<void> => {
        await this.prisma.order.deleteMany();
        await this.prisma.orderItem.deleteMany();
        await this.prisma.payment.deleteMany();

        res.sendStatus(200);
    };
}

export default TestRoute;

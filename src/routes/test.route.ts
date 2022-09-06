import { Routes } from '@/interfaces/routes.interface';
import cloudinary from '@/utils/cloudinary';
import { PrismaClient, Role } from '@prisma/client';
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
        console.log(req.cookies);
        res.cookie('data', 'test');
        res.sendStatus(200);
    };
}

export default TestRoute;

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
        const imageResponse = await cloudinary.uploader.upload(
            'https://images.unsplash.com/photo-1661206514777-2463d0d0599a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2MjMwMDUzNQ&ixlib=rb-1.2.1&q=80&w=1080',
        );
        // res.sendStatus(200);
        res.status(200).json({
            data: imageResponse,
        });
    };
}

export default TestRoute;

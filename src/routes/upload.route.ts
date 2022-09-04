import UploadController from '@/controllers/upload.controller';
import { Routes } from '@/interfaces/routes.interface';
import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';

class UploadRoute implements Routes {
    public path = '/api/upload';
    public router = Router();
    public prisma = new PrismaClient();
    public uploadController = new UploadController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/images', this.uploadController.uploadImages);
        // this.router.post('/files', this.uploadController.uploadFiles);
    }
}

export default UploadRoute;

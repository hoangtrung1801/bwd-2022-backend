import CategoriesController from '@/controllers/categories.controller';
import { CreateCategoryDto } from '@/dtos/categories.dto';
import { CreateProductDto } from '@/dtos/products.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class CategoriesRoute implements Routes {
    public path: string = '/api/categories';
    public router = Router();
    public CategoriesController = new CategoriesController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.CategoriesController.getAllCategories);
        this.router.get('/:id', this.CategoriesController.getCategory);
        this.router.post('/', validationMiddleware(CreateCategoryDto, 'body'), this.CategoriesController.createCategory);
        this.router.put('/:id', validationMiddleware(CreateCategoryDto, 'body', true), this.CategoriesController.updateCategory);
        this.router.delete('/:id', this.CategoriesController.deleteCategory);
    }
}

export default CategoriesRoute;

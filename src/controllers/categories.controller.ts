import { CreateCategoryDto } from '@/dtos/categories.dto';
import StatusCode from '@/interfaces/status.enum';
import CategoriesService from '@/services/categories.service';
import { Category } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

class CategoriesController {
    public categoriesService = new CategoriesService();

    public getAllCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const allCategories = await this.categoriesService.findAll();

            res.status(200).json({
                status: StatusCode.SUCCESS,
                data: allCategories,
            });
        } catch (error) {
            next(error);
        }
    };

    public getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const categoryId = String(req.params.id);
            const category = await this.categoriesService.findById(categoryId);

            res.status(200).json({
                status: StatusCode.SUCCESS,
                data: category,
            });
        } catch (error) {
            next(error);
        }
    };

    public createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const categoryData: CreateCategoryDto = req.body;
            const category: Category = await this.categoriesService.create(categoryData);

            res.status(201).json({
                status: StatusCode.SUCCESS,
                data: category,
            });
        } catch (error) {
            next(error);
        }
    };

    public updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const categoryData: CreateCategoryDto = req.body;
            const categoryId = String(req.params.id);
            const category: Category = await this.categoriesService.update(categoryId, categoryData);

            res.status(200).json({
                status: StatusCode.SUCCESS,
                data: category,
            });
        } catch (error) {
            next(error);
        }
    };

    public deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const categoryId = String(req.params.id);
            const category: Category = await this.categoriesService.delete(categoryId);

            res.status(200).json({
                status: StatusCode.SUCCESS,
                data: category,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default CategoriesController;

import { CreateProductDto, ProductDto } from '@/dtos/products.dto';
import StatusResponse from '@/interfaces/status.enum';
import ProductsService from '@/services/products.service';
import { Product } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

class ProductsController {
    public productsService = new ProductsService();

    public getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const allProducts = await this.productsService.findAll();

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: allProducts,
            });
        } catch (error) {
            next(error);
        }
    };

    public getProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const productId = String(req.params.id);
            const product = await this.productsService.findById(productId);

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: product,
            });
        } catch (error) {
            next(error);
        }
    };

    public createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const productData: CreateProductDto = req.body;
            const product: Product = await this.productsService.create(productData);

            res.status(201).json({
                status: StatusResponse.SUCCESS,
                data: product,
            });
        } catch (error) {
            next(error);
        }
    };

    public updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const productData: ProductDto = req.body;
            const productId = String(req.params.id);
            const product: Product = await this.productsService.update(productId, productData);

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: product,
            });
        } catch (error) {
            next(error);
        }
    };

    public deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const producId = String(req.params.id);
            const product: Product = await this.productsService.delete(producId);

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: product,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default ProductsController;

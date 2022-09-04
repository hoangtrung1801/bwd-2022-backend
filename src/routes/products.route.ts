import ProductsController from '@/controllers/products.controller';
import { CreateProductDto, ProductDto } from '@/dtos/products.dto';
import { Routes } from '@/interfaces/routes.interface';
import resolveImageMiddware from '@/middlewares/resolveImage.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class ProductsRoute implements Routes {
    public path: string = '/api/products';
    public router = Router();
    public productsController = new ProductsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.productsController.getAllProducts);
        this.router.get('/:id', this.productsController.getProduct);
        this.router.post('/', resolveImageMiddware, validationMiddleware(CreateProductDto, 'body'), this.productsController.createProduct);
        this.router.put('/:id', validationMiddleware(ProductDto, 'body', true), this.productsController.updateProduct);
        this.router.delete('/:id', this.productsController.deleteProduct);
    }
}

export default ProductsRoute;

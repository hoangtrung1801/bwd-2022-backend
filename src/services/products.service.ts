import { CreateProductDto, ProductDto } from '@/dtos/products.dto';
import { HttpException } from '@/exceptions/HttpException';
import Service from '@/interfaces/service.interface';
import { isEmpty } from '@/utils/util';
import { PrismaClient, Product } from '@prisma/client';
import { plainToClass, plainToInstance } from 'class-transformer';

class ProductsService {
    public products = new PrismaClient().product;

    public async findAll(): Promise<Product[]> {
        const allProducts = await this.products.findMany({
            include: {
                categories: true,
            },
        });
        return Promise.resolve(allProducts);
    }

    public async findById(productId: string): Promise<Product> {
        if (isEmpty(productId)) throw new HttpException(400, 'productId is empty');

        const foundProduct = await this.products.findUnique({ where: { id: productId }, include: { categories: true } });
        if (!foundProduct) throw new HttpException(409, "product doesn't exist");

        return foundProduct;
    }

    public async create(productData: CreateProductDto): Promise<Product> {
        if (isEmpty(productData)) throw new HttpException(400, 'Product is empty');

        const { name, desc, price, categoryIDs } = productData;
        const createProduct: Product = await this.products.create({
            data: {
                name,
                desc,
                price,
                categoryIDs,
            },
            include: {
                categories: true,
            },
        });

        return createProduct;
    }

    public async update(productId: string, productData: ProductDto): Promise<Product> {
        if (isEmpty(productData)) throw new HttpException(400, 'Product is empty');

        const findProduct: Product = await this.products.findUnique({ where: { id: productId } });
        if (!findProduct) throw new HttpException(409, "Product doesn't exist");

        // const updateProducData = plainToInstance(ProductDto, productData);
        const product = await this.products.update({ where: { id: productId }, data: { ...productData } });

        return product;
    }

    public async delete(producId: string): Promise<Product> {
        if (isEmpty(producId)) throw new HttpException(400, 'Product is empty');

        const findProduct: Product = await this.products.findUnique({ where: { id: producId } });
        if (!findProduct) throw new HttpException(409, "Product doesn't exist");

        const deleteProductData = await this.products.delete({ where: { id: producId } });
        return deleteProductData;
    }
}

export default ProductsService;

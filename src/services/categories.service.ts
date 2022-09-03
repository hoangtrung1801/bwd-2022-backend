import { CategoryDto, CreateCategoryDto } from '@/dtos/categories.dto';
import { ProductDto } from '@/dtos/products.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Category, PrismaClient } from '@prisma/client';
import { isEmpty } from 'class-validator';

class CategoriesService {
    public categories = new PrismaClient().category;

    public async findAll(): Promise<Category[]> {
        const allProducts = await this.categories.findMany({
            include: {
                products: true,
            },
        });
        return Promise.resolve(allProducts);
    }

    public async findById(categoryId: string): Promise<Category> {
        if (isEmpty(categoryId)) throw new HttpException(400, 'productId is empty');

        const foundCategory = await this.categories.findUnique({ where: { id: categoryId }, include: { products: true } });
        if (!foundCategory) throw new HttpException(409, "Category doesn't exist");

        return foundCategory;
    }

    public async create(categoryData: CreateCategoryDto): Promise<Category> {
        if (isEmpty(categoryData)) throw new HttpException(400, 'Category is empty');

        const { name, label, productIDs } = categoryData;
        const createProduct: Category = await this.categories.create({
            data: {
                name,
                label,
                productIDs,
            },
        });

        return createProduct;
    }

    public async update(categoryId: string, categoryData: CreateCategoryDto): Promise<Category> {
        if (isEmpty(categoryData)) throw new HttpException(400, 'Category is empty');

        const foundCategory: Category = await this.categories.findUnique({ where: { id: categoryId } });
        if (!foundCategory) throw new HttpException(409, "Category doesn't exist");

        // const updateProducData = plainToInstance(ProductDto, productData);
        const category: Category = await this.categories.update({ where: { id: categoryId }, data: { ...categoryData } });

        return category;
    }

    public async delete(categoryId: string): Promise<Category> {
        if (isEmpty(categoryId)) throw new HttpException(400, 'Category is empty');

        const founcCategory: Category = await this.categories.findUnique({ where: { id: categoryId } });
        if (!founcCategory) throw new HttpException(409, "Category doesn't exist");

        const category = await this.categories.delete({ where: { id: categoryId } });
        return category;
    }
}

export default CategoriesService;

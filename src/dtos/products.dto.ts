import { Exclude } from 'class-transformer';
import { IsDecimal, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDto {
    @IsString()
    @IsMongoId()
    @IsOptional()
    public id?: string;

    @IsString()
    @IsOptional()
    public name?: string;

    @IsString()
    @IsOptional()
    public desc?: string;

    @IsDecimal()
    @IsOptional()
    public price?: number;

    @IsString({ each: true })
    @IsOptional()
    public images?: string[];

    @IsString({ each: true })
    @IsOptional()
    public categoryIDs?: string[];
}

export class CreateProductDto {
    //   name        String
    //   desc        String
    //   price       Float
    //   categoryIDs String[]    @db.ObjectId
    //   categories  Category[]  @relation(fields: [categoryIDs], references: [id])
    //   createdAt   DateTime    @default(now())
    //   modifiedAt  DateTime    @default(now()) @updatedAt
    //   OrderItem   OrderItem[]

    @IsString()
    public name: string;

    @IsString()
    public desc: string;

    @IsNumber()
    public price: number;

    @IsString({ each: true })
    public images: string[] = [];

    @IsString({ each: true })
    public categoryIDs: string[] = [];
}

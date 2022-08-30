import { Exclude } from 'class-transformer';
import { IsDecimal, IsMongoId, IsNumber, IsString } from 'class-validator';

export class ProductDto {
    @IsString()
    @IsMongoId()
    // @Exclude()
    public id: string;

    @IsString()
    public name: string;

    @IsString()
    public desc: string;

    @IsDecimal()
    public price: number;

    @IsString({ each: true })
    public categoryIDs: string[];
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
    public categoryIDs: string[];
}
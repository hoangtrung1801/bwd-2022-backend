import { IsEmpty, IsMongoId, IsNumber, IsOptional, ValidateIf } from 'class-validator';

export class OrderDto {
    @IsMongoId()
    @IsOptional()
    public id: string;

    @IsNumber()
    public total: number;

    @IsMongoId({ each: true })
    public itemIDs: string[];

    @IsMongoId()
    @IsOptional()
    public paymentID: string;
}

export class CreateOrderDto {
    @IsNumber()
    public total: number;

    @IsMongoId({ each: true })
    public itemIDs: string[];

    @IsMongoId()
    public paymentID: string;
}

import { IsEmpty, IsMongoId, IsNumber, IsObject, IsOptional, ValidateIf, ValidateNested } from 'class-validator';
import { CreateOrderItemDto, OrderItemDto } from './orderItems.dto';

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

    @IsObject({ each: true })
    public items: CreateOrderItemDto[];

    // @IsMongoId()
    // @IsOptional()
    // public paymentID: string;
}

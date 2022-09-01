import { IsMongoId, IsNumber, IsOptional, IsPositive, IsPostalCode, IsString } from 'class-validator';

export class OrderItemDto {
    @IsMongoId()
    @IsOptional()
    public id?: string;

    @IsPositive()
    public quantity?: number;

    @IsMongoId()
    public productID?: string;

    @IsMongoId()
    public orderID?: string;
}

export class CreateOrderItemDto {
    @IsPositive()
    public quantity: number;

    @IsMongoId()
    public productID: string;
}

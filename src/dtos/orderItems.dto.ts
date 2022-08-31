import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class OrderItemDto {
    @IsMongoId()
    @IsOptional()
    public id: string;

    @IsNumber()
    public quantity: number;

    @IsMongoId()
    public productID: string;
}

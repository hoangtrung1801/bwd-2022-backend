import { PaymentStatus } from '@prisma/client';
import { IsEnum, IsMongoId, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateOrderDto } from './orders.dto';

export class PaymentDto {
    @IsMongoId()
    @IsOptional()
    public id?: string;

    @IsEnum(PaymentStatus)
    public status?: PaymentStatus;

    @IsMongoId()
    public userID?: string;

    @IsMongoId()
    @IsOptional()
    public orderID?: string;
}

export class CreatePaymentDto {
    @IsEnum(PaymentStatus)
    public status?: PaymentStatus;

    @ValidateNested()
    @IsOptional()
    public order?: CreateOrderDto;
}

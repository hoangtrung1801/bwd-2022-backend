import { PaymentStatus } from '@prisma/client';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class PaymentDto {
    @IsMongoId()
    @IsOptional()
    public id: string;

    @IsString()
    public status: PaymentStatus;

    @IsMongoId()
    public userID: string;

    @IsMongoId()
    @IsOptional()
    public orderID: string;
}

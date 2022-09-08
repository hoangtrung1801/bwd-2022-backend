import { Donator } from '@prisma/client';
import { IsDate, IsNumber, IsObject, IsString, IsUrl } from 'class-validator';

export class CreateDonationDto {
    @IsString()
    public name?: string;

    @IsString()
    public desc?: string;

    @IsNumber()
    public target?: number;

    @IsString()
    public expiryDate?: string;

    @IsUrl()
    public image?: string;

    @IsObject({ each: true })
    public donator: Donator[] = [];
}

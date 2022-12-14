import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsMongoId, IsObject, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UserDto {
    @IsMongoId()
    @IsOptional()
    public id: string;

    @IsEmail()
    public email: string;

    @IsString()
    public password: string;

    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;

    @IsString()
    public phone: string;

    @IsString()
    public role: Role = Role.USER;

    @IsObject()
    public address: {
        addressLine: string;
        city: string;
        country: string;
        phone: string;
    };
}

export class LoginUserDto {
    @IsString()
    public email: string;

    @IsString()
    public password: string;
}

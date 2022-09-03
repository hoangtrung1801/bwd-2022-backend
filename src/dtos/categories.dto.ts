import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
    @IsMongoId()
    @IsOptional()
    public id: string;

    @IsString()
    public name: string;

    @IsString()
    public label: string;

    @IsString({ each: true })
    public productIDs: string[];
}

export class CreateCategoryDto {
    @IsString()
    public name: string;

    @IsString()
    public label: string;

    @IsString({ each: true })
    public productIDs: string[] = [];
}

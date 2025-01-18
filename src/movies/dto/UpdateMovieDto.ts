import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateMovieDto {

    @IsString()
    id: string

    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsNumber()
    year?: number

    @IsOptional()
    @IsString()
    category?: string

}
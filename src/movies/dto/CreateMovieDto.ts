import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString } from "class-validator"
import { Director } from "../entities/director.entity"

export class CreateMovieDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    category: string

    @IsNumber()
    @IsNotEmpty()
    year: number

    @IsObject()
    @IsNotEmptyObject()
    @IsNotEmpty()
    director: Director
}
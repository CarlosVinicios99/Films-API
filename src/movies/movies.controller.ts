import { Body, Controller, Post } from "@nestjs/common";
import { CreateMovieDto } from "./dto/CreateMovieDto";

@Controller('movies')
export class MoviesController {

  constructor(){}
    
  @Post()
  create(@Body() body: CreateMovieDto){
    
  }

}
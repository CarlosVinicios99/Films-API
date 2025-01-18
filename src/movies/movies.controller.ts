import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateMovieDto } from "./dto/CreateMovieDto";
import { MoviesService } from "./movies.service";

@Controller('movies')
export class MoviesController {

  constructor(
    private readonly moviesService: MoviesService
  ){}
    
  @Post()
  create(@Body() body: CreateMovieDto){
    return this.moviesService.createMovie(body)
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number){
    return this.moviesService.findAll(page, limit)
  }

}
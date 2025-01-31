import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateMovieDto } from "./dto/CreateMovieDto";
import { MoviesService } from "./movies.service";
import { UpdateMovieDto } from "./dto/UpdateMovieDto";

@Controller('movies')
export class MoviesController {

  constructor(
    private readonly moviesService: MoviesService
  ){}
    
  @Post()
  create(@Body() body: CreateMovieDto){
    return this.moviesService.createMovie(body)
  }

  @Put()
  update(@Body() body: UpdateMovieDto){
    
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number){
    return this.moviesService.findAll(page, limit)
  }

  @Get(':id')
  findById(@Param('id') id: string){
    return this.moviesService.findById(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.moviesService.remove(id)
  }

}
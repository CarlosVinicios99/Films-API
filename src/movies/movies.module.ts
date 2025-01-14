import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Director } from './entities/director.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Movie, Director])],
    controllers: [MoviesController],
    providers: [MoviesService]
})
export class MoviesModule {

}

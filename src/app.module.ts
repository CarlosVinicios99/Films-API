import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { DirectorsModule } from './directors/directors.module';

@Module({
  imports: [MoviesModule, DirectorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

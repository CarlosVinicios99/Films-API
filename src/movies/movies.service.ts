import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "./entities/movie.entity";
import { Repository } from "typeorm";
import { Director } from "./entities/director.entity";
import { CreateMovieDto } from "./dto/CreateMovieDto";

@Injectable()
export class MoviesService {

  private readonly logger: Logger = new Logger(MoviesService.name)

  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,

    @InjectRepository(Director)
    private readonly directorsRepository: Repository<Director>

  ){}

  private async findDirectorByName(name: string): Promise<Director> {

    const directors: Director[] = await this.directorsRepository.find({
      where: {
        name: name.toLowerCase()
      }
    })

    if(!directors?.length){
      return null
    }

    return directors[0]
  }

  private async createDirector(director: Director): Promise<Director>{

    const newDirector: Director = this.directorsRepository.create({
      ...director
    })

    return this.directorsRepository.save(newDirector)
  }


  public async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    this.logger.verbose(`iniciando cadastro de filme`)

    this.logger.warn(`buscando pelo diretor do filme no banco`)
    let director: Director = await this.findDirectorByName(createMovieDto.director.name)

    this.logger.verbose(`verificando se o diretor do filme já existe`)
    if(!director){
      this.logger.warn(`cadastrando diretor no banco`)
      director = await this.createDirector(director)
    }

    const newMovie = this.moviesRepository.create({
      title: createMovieDto.title,
      category: createMovieDto.category,
      year: createMovieDto.year,
      director: director
    })

    this.logger.warn(`salvando o filme no banco`)
    return this.moviesRepository.save(newMovie)
  }

}
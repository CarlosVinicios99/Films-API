import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
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


  public async createMovie(createMovieDto: CreateMovieDto): Promise<Movie | HttpException>{
    this.logger.verbose(`iniciando cadastro de filme`)

    try{
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
    catch(error){
      this.logger.error(`erro ao cadastrar filme. `, error)
      return new HttpException(`Erro ao cadastrar filme`, HttpStatus.BAD_REQUEST)
    }
  }

  public async findAll(page: number = 1, limit: number = 5): Promise<Movie[] | HttpException>{

    try{
      this.logger.verbose(`iniciando busca por todos os filmes`)

      this.logger.verbose(`criando o deslocamento da paginação`)
      const skip: number = page <= 1 ? 0 : (page - 1) * limit

      return this.moviesRepository.find({
        skip
      })
    }
    catch(error){
      this.logger.error(`erro ao buscar lista de filmes`, error)
      return new HttpException(`Erro ao buscar lista de filmes`, HttpStatus.BAD_REQUEST)
    }

  }

}
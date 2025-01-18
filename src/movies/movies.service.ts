import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "./entities/movie.entity";
import { Repository } from "typeorm";
import { Director } from "./entities/director.entity";
import { CreateMovieDto } from "./dto/CreateMovieDto";
import { UpdateMovieDto } from "./dto/UpdateMovieDto";

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

  public async findById(movieId: string): Promise<Movie | HttpException> {
    try{
      this.logger.verbose(`iniciando busca de filme por ID`)

      this.logger.warn(`buscando filme por ID no banco`)
      const movie: Movie = await this.moviesRepository.findOne({
        where: {id: movieId}
      }) 

      if(!movie){
        return new HttpException(`erro ao buscar filme por ID`, HttpStatus.BAD_REQUEST)
      }

      return movie
    }
    catch(error){
      this.logger.error(`erro ao buscar filme por ID`, error)
      throw new HttpException(`erro ao buscar filme por ID`, HttpStatus.SERVICE_UNAVAILABLE)
    }
  }

  async update(updateMovieDto: UpdateMovieDto){
    try{
      this.logger.verbose(`iniciando atualização de filme`)

      this.logger.warn(`atualizando registro de filme no banco`)
      const movie: Movie = await this.moviesRepository.preload({
        ...updateMovieDto
      })
  
      if(!movie){
        throw new HttpException(`filme não encontrado`, HttpStatus.NOT_FOUND)
      }
  
      return this.moviesRepository.save(movie)
    }
    catch(error){
      this.logger.error(`erro na atualização de filme`, error)
      throw new HttpException(`erro ao atualizar filme`, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string): Promise<void | HttpException>{
    try{
      this.logger.verbose(`iniciando remoção de filme`)

      this.logger.warn(`buscando filme no banco`)
      const movie: Movie = await this.moviesRepository.findOne({
        where: {
          id
        }
      }) 

      this.logger.verbose(`checando se o filme existe no banco`)
      if(!movie){
        throw new HttpException(`filme com ID ${id} não encontrado!`, HttpStatus.NOT_FOUND)
      }

      this.logger.warn(`removendo o filme no banco`)
      await this.moviesRepository.remove(movie)
      return
    }
    catch(error){
      this.logger.error(`erro ao remover filme`, error)
      throw new HttpException(`erro ao remover filme`, HttpStatus.SERVICE_UNAVAILABLE)
    }
  }

}
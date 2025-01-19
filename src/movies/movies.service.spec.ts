import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service'; 
import { randomUUID } from 'node:crypto';
import { CreateMovieDto } from './dto/CreateMovieDto';  
import { UpdateMovieDto } from './dto/UpdateMovieDto';

describe('CoursesService unit tests', () => {
  let service: MoviesService;

  let id: string
  let createdAt: Date
  let expectOutputMovie: any
  let expectOutputDirector: any
  let mockMoviesRepository: any
  let mockDirectorsRepository: any

  beforeEach(async () => {
    service = new MoviesService()

    id = randomUUID()
    createdAt = new Date()

    expectOutputDirector = {
      id,
      name: 'christopher nolan',
      dateOfBirth: "1970-07-30T00:00:00Z",
      nationality: "inglaterra"
    }

    expectOutputMovie = {
      id,
      title: 'interestelar',
      category: 'ficção científica',
      year: 2014,
      director: expectOutputDirector
    }

    mockMoviesRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputMovie)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputMovie)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputMovie)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputMovie)),
      findAll: jest.fn().mockReturnValue(Promise.resolve([expectOutputMovie])),
      find: jest.fn().mockReturnValue(Promise.resolve([expectOutputMovie])),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputMovie)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputMovie)),
    }

    mockDirectorsRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputDirector)),
      find: jest.fn().mockReturnValue(Promise.resolve([expectOutputDirector])),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputDirector))
    }

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should create a movie', async () => {

    //@ts-expect-error defined part of methods
    service['moviesRepository'] = mockMoviesRepository

     //@ts-expect-error defined part of methods
    service['directorsRepository'] = mockDirectorsRepository

    const createMovieDto: CreateMovieDto = {
      title: 'interestelar',
      category: 'ficção científica',
      year: 2014,
      director: {
        id,
        name: 'christopher nolan',
        dateOfBirth: new Date("1970-07-30T00:00:00Z"),
        nationality: "inglaterra"
      }
    }

    const newMovie = await service.createMovie(createMovieDto)

    
    expect(mockMoviesRepository.save).toHaveBeenCalled()
    expect(expectOutputMovie).toStrictEqual(newMovie)

  });

  it('should list all movies', async () => {
    //@ts-expect-error defined part of methods
    service['moviesRepository'] = mockMoviesRepository

    //@ts-expect-error defined part of methods
    service['directorsRepository'] = mockDirectorsRepository

    const courses = await service.findAll()

    expect(mockMoviesRepository.find).toHaveBeenCalled()
    expect([expectOutputMovie]).toStrictEqual(courses)
  })


  it('should gets a movie by id', async () => {
  
    //@ts-expect-error defined part of methods
    service['moviesRepository'] = mockMoviesRepository

    //@ts-expect-error defined part of methods
    service['directorsRepository'] = mockDirectorsRepository

    const course = await service.findById(id)

    expect(mockMoviesRepository.findOne).toHaveBeenCalled()
    expect(expectOutputMovie).toStrictEqual(course)
  })


  
  it('should update a movie', async () => {

    //@ts-expect-error defined part of methods
    service['moviesRepository'] = mockMoviesRepository

    //@ts-expect-error defined part of methods
    service['directorsRepository'] = mockDirectorsRepository

    const updateMovieDto: UpdateMovieDto = {
      id,
      title: 'interestelar',
      category: 'ficção científica',
      year: 2014
    }

    const movie = await service.update(updateMovieDto)

    expect(mockMoviesRepository.preload).toHaveBeenCalled()
    expect(mockMoviesRepository.save).toHaveBeenCalled()

    expect(expectOutputMovie).toStrictEqual(movie)
  })

  
  it('should delete a movie by id', async () => {
    //@ts-expect-error defined part of methods
    service['moviesRepository'] = mockMoviesRepository

    //@ts-expect-error defined part of methods
    service['directorsRepository'] = mockDirectorsRepository

    await service.remove(id)
    
    expect(mockMoviesRepository.findOne).toHaveBeenCalled()
    expect(mockMoviesRepository.remove).toHaveBeenCalled()
  })
  

});
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
      find: jest.fn().mockReturnValue(Promise.resolve([expectOutputDirector]))
    }

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*
  it('should create a course', async () => {

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository

     //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagsRepository

    const createCourseDTO: CreateCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs']
    }

    const newCourse = await service.create(createCourseDTO)

    
    expect(mockCourseRepository.save).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(newCourse)

  });

  
  it('should list all courses', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository

    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagsRepository

    const courses = await service.findAll()

    expect(mockCourseRepository.find).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(courses)
  })

  it('should gets a course by id', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository

    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagsRepository

    const course = await service.findOne(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(course)
  })

  it('should update a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository

    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagsRepository

    const updateCourseDTO: UpdateCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs']
    }

    const course = await service.update(id, updateCourseDTO)

    expect(mockCourseRepository.preload).toHaveBeenCalled()
    expect(mockCourseRepository.save).toHaveBeenCalled()

    expect(expectOutputCourses).toStrictEqual(course)
  })

  it('should delete a course by id', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository

    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagsRepository

    const course = await service.remove(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled()
    expect(mockCourseRepository.remove).toHaveBeenCalled()
    
    expect(expectOutputCourses).toStrictEqual(course)
  })
  */

});
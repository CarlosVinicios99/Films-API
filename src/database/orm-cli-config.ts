import 'dotenv/config'
import { Director } from 'src/directors/entities/director.entity'
import { CreateMoviesTable1736702463619 } from 'src/migrations/1736702463619-CreateMoviesTable'
import { CreateDirectorsTable1736704518041 } from 'src/migrations/1736704518041-CreateDirectorsTable'
import { AddDirectorIdInMovies1736817777177 } from 'src/migrations/1736817777177-AddDirectorIdInMovies'
import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Director],
  synchronize: false
}

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateMoviesTable1736702463619, 
    CreateDirectorsTable1736704518041,
    AddDirectorIdInMovies1736817777177
  ]
})
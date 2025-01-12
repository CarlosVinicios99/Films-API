import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMoviesTable1736702463619 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(
      new Table({
        name: 'movies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'category',
            type: 'varchar'
          },
          {
            name: 'year',
            type: 'integer'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movies')
  }

}

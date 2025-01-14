import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddDirectorIdInMovies1736817777177 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.addColumn(
      'movies',
      new TableColumn({
        name: 'director_id',
        type: 'uuid',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'movies',
      new TableForeignKey({
        name: 'movies_director',
        columnNames: ['director_id'],
        referencedTableName: 'directors',
        referencedColumnNames: ['id']
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.dropForeignKey('movies', 'movies_director')

    await queryRunner.dropColumn('movies', 'director_id')

  }

}

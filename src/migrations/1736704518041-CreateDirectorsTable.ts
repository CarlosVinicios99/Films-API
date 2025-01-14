import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDirectorsTable1736704518041 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'directors',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'nationality',
          type: 'varchar'
        },
        {
          name: 'date_of_birth',
          type: 'timestamp'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('directors')
  }

}

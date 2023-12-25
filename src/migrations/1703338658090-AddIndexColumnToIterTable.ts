import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexColumnToIterTable1703338658090
  implements MigrationInterface
{
  name = 'AddIndexColumnToIterTable1703338658090';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "iterations" ADD "index" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "iterations" DROP COLUMN "index"`);
  }
}

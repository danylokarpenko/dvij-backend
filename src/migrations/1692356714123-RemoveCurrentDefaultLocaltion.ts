import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveCurrentDefaultLocaltion1692356714123
  implements MigrationInterface
{
  name = 'RemoveCurrentDefaultLocaltion1692356714123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "defaultLocation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "currentLocation"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "currentLocation" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "defaultLocation" character varying`,
    );
  }
}

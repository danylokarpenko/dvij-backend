import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBonusColumn1702220722323 implements MigrationInterface {
  name = 'AddBonusColumn1702220722323';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gameUsers" ADD "bonus" numeric DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "gameUsers" DROP COLUMN "bonus"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLikesArray1703015519341 implements MigrationInterface {
  name = 'AddLikesArray1703015519341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ideas" DROP COLUMN "likes"`);
    await queryRunner.query(
      `ALTER TABLE "ideas" ADD "likes" integer array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(`ALTER TABLE "iterations" DROP COLUMN "likes"`);
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD "likes" integer array NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "iterations" DROP COLUMN "likes"`);
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD "likes" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE "ideas" DROP COLUMN "likes"`);
    await queryRunner.query(
      `ALTER TABLE "ideas" ADD "likes" integer NOT NULL DEFAULT '0'`,
    );
  }
}

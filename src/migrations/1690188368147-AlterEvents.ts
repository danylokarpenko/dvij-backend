import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterEvents1690188368147 implements MigrationInterface {
  name = 'AlterEvents1690188368147';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "avatarUrl" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "events" ADD "lat" numeric`);
    await queryRunner.query(`ALTER TABLE "events" ADD "lng" numeric`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "firstName" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "lastName" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatarUrl" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "rating" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "restrictionLvl" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "defaultLocation" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "currentLocation" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "currentLocation" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "defaultLocation" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "restrictionLvl" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "rating" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatarUrl" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "lastName" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "firstName" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "lng"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "lat"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "avatarUrl"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
  }
}

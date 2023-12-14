import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreaGameStatisticTable1702068661786 implements MigrationInterface {
  name = 'CreaGameStatisticTable1702068661786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gameStatistics" ("id" SERIAL NOT NULL, "gameId" integer, "cpi" numeric, "pt" integer, "d1" integer, "d7" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bb1c57ca3ec10a0afddfc78e20c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "releaseDate" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "cpi" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "pt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "d1" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "d7" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "targetCpi" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "targetPt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "targetRetD1" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "targetRetD7" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "dau" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "installs" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "malesGenderPercentage" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "minAge" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "maxAge" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameStatistics" ADD CONSTRAINT "FK_36c27369c2f3bbf3428101d54f3" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gameStatistics" DROP CONSTRAINT "FK_36c27369c2f3bbf3428101d54f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "maxAge" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "minAge" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "malesGenderPercentage" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "installs" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "dau" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "targetRetD7" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "targetRetD1" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "targetPt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "targetCpi" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "d7" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "d1" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "pt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "cpi" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ALTER COLUMN "releaseDate" SET NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "gameStatistics"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGameLinks1702065811315 implements MigrationInterface {
  name = 'AddGameLinks1702065811315';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "games" ADD "iStoreLink" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ADD "googleStoreLink" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ADD "gitLink" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ADD "googleDriveLink" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ADD "trelloLink" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" DROP CONSTRAINT "FK_e866c5b45f7039ee6135559acff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" DROP CONSTRAINT "FK_db0bdec75f781b482b9cf9c00b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ALTER COLUMN "likes" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ALTER COLUMN "isApproved" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD CONSTRAINT "FK_e866c5b45f7039ee6135559acff" FOREIGN KEY ("hitId") REFERENCES "hits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD CONSTRAINT "FK_db0bdec75f781b482b9cf9c00b8" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "iterations" DROP CONSTRAINT "FK_db0bdec75f781b482b9cf9c00b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" DROP CONSTRAINT "FK_e866c5b45f7039ee6135559acff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ALTER COLUMN "gameId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ALTER COLUMN "hitId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ALTER COLUMN "isApproved" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ALTER COLUMN "likes" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD CONSTRAINT "FK_db0bdec75f781b482b9cf9c00b8" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD CONSTRAINT "FK_e866c5b45f7039ee6135559acff" FOREIGN KEY ("hitId") REFERENCES "hits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "trelloLink"`);
    await queryRunner.query(
      `ALTER TABLE "games" DROP COLUMN "googleDriveLink"`,
    );
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "gitLink"`);
    await queryRunner.query(
      `ALTER TABLE "games" DROP COLUMN "googleStoreLink"`,
    );
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "iStoreLink"`);
  }
}

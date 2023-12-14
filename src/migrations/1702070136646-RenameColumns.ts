import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumns1702070136646 implements MigrationInterface {
  name = 'RenameColumns1702070136646';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "iterations" DROP CONSTRAINT "FK_e866c5b45f7039ee6135559acff"`,
    );
    await queryRunner.query(
      `CREATE TABLE "gameIncomes" ("id" SERIAL NOT NULL, "gameId" integer, "amount" numeric NOT NULL, "month" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_51510b958c133c2e6ceaac112c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "iterations" DROP COLUMN "hitId"`);
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "retD1"`);
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "retD7"`);
    await queryRunner.query(`ALTER TABLE "games" ADD "d1" integer`);
    await queryRunner.query(`ALTER TABLE "games" ADD "d7" integer`);
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "cpi"`);
    await queryRunner.query(`ALTER TABLE "games" ADD "cpi" numeric`);
    await queryRunner.query(
      `ALTER TABLE "gameIncomes" ADD CONSTRAINT "FK_b35a48e4b8ad018472a9c096d8d" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gameIncomes" DROP CONSTRAINT "FK_b35a48e4b8ad018472a9c096d8d"`,
    );
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "cpi"`);
    await queryRunner.query(`ALTER TABLE "games" ADD "cpi" integer`);
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "d7"`);
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "d1"`);
    await queryRunner.query(`ALTER TABLE "games" ADD "retD7" integer`);
    await queryRunner.query(`ALTER TABLE "games" ADD "retD1" integer`);
    await queryRunner.query(`ALTER TABLE "iterations" ADD "hitId" integer`);
    await queryRunner.query(`DROP TABLE "gameIncomes"`);
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD CONSTRAINT "FK_e866c5b45f7039ee6135559acff" FOREIGN KEY ("hitId") REFERENCES "hits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

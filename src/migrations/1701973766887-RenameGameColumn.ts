import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameGameColumn1701973766887 implements MigrationInterface {
  name = 'RenameGameColumn1701973766887';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "talents" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "name" character varying NOT NULL, "iconUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8cecf07c0d624cc503d6a36df52" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_talents_talents" ("usersId" integer NOT NULL, "talentsId" integer NOT NULL, CONSTRAINT "PK_82e1bd8627ac95354b38900e350" PRIMARY KEY ("usersId", "talentsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c9d49a3eca7b76d43cbce0f11a" ON "users_talents_talents" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4704abb7c187a25183c1397ef8" ON "users_talents_talents" ("talentsId") `,
    );
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "publisherUrl"`);
    await queryRunner.query(
      `ALTER TABLE "games" ADD "publisherName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ADD "mainIdea" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "hitIncomes" DROP CONSTRAINT "FK_c51a89fdd032a2046e6c96abbe8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" DROP CONSTRAINT "FK_5e9ea97de80c51773e233fe417f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" DROP CONSTRAINT "FK_e866c5b45f7039ee6135559acff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" DROP CONSTRAINT "FK_db0bdec75f781b482b9cf9c00b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ALTER COLUMN "creatorId" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "hitIncomes" ADD CONSTRAINT "FK_c51a89fdd032a2046e6c96abbe8" FOREIGN KEY ("hitId") REFERENCES "hits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD CONSTRAINT "FK_5e9ea97de80c51773e233fe417f" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD CONSTRAINT "FK_e866c5b45f7039ee6135559acff" FOREIGN KEY ("hitId") REFERENCES "hits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD CONSTRAINT "FK_db0bdec75f781b482b9cf9c00b8" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_talents_talents" ADD CONSTRAINT "FK_c9d49a3eca7b76d43cbce0f11a0" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_talents_talents" ADD CONSTRAINT "FK_4704abb7c187a25183c1397ef8a" FOREIGN KEY ("talentsId") REFERENCES "talents"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_talents_talents" DROP CONSTRAINT "FK_4704abb7c187a25183c1397ef8a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_talents_talents" DROP CONSTRAINT "FK_c9d49a3eca7b76d43cbce0f11a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" DROP CONSTRAINT "FK_db0bdec75f781b482b9cf9c00b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" DROP CONSTRAINT "FK_e866c5b45f7039ee6135559acff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" DROP CONSTRAINT "FK_5e9ea97de80c51773e233fe417f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hitIncomes" DROP CONSTRAINT "FK_c51a89fdd032a2046e6c96abbe8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ALTER COLUMN "gameId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ALTER COLUMN "hitId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ALTER COLUMN "creatorId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD CONSTRAINT "FK_db0bdec75f781b482b9cf9c00b8" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD CONSTRAINT "FK_e866c5b45f7039ee6135559acff" FOREIGN KEY ("hitId") REFERENCES "hits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD CONSTRAINT "FK_5e9ea97de80c51773e233fe417f" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hitIncomes" ALTER COLUMN "hitId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hitIncomes" ADD CONSTRAINT "FK_c51a89fdd032a2046e6c96abbe8" FOREIGN KEY ("hitId") REFERENCES "hits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "mainIdea"`);
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "publisherName"`);
    await queryRunner.query(
      `ALTER TABLE "games" ADD "publisherUrl" character varying NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4704abb7c187a25183c1397ef8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c9d49a3eca7b76d43cbce0f11a"`,
    );
    await queryRunner.query(`DROP TABLE "users_talents_talents"`);
    await queryRunner.query(`DROP TABLE "talents"`);
  }
}

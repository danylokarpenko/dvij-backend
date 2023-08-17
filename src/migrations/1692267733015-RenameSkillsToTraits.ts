import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameSkillsToTraits1692267733015 implements MigrationInterface {
  name = 'RenameSkillsToTraits1692267733015';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "traits" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3956071aa0a8eb8210aa1c6a563" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "usertraits" ("userId" integer NOT NULL, "traitId" integer NOT NULL, CONSTRAINT "PK_e339f4d70b7d76928738a7d5d12" PRIMARY KEY ("userId", "traitId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7b18dbaaa2b4b284094c43589c" ON "usertraits" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1b539e7051991ccba81e26e16e" ON "usertraits" ("traitId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "usertraits" ADD CONSTRAINT "FK_7b18dbaaa2b4b284094c43589cd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "usertraits" ADD CONSTRAINT "FK_1b539e7051991ccba81e26e16ee" FOREIGN KEY ("traitId") REFERENCES "traits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usertraits" DROP CONSTRAINT "FK_1b539e7051991ccba81e26e16ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usertraits" DROP CONSTRAINT "FK_7b18dbaaa2b4b284094c43589cd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1b539e7051991ccba81e26e16e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7b18dbaaa2b4b284094c43589c"`,
    );
    await queryRunner.query(`DROP TABLE "usertraits"`);
    await queryRunner.query(`DROP TABLE "traits"`);
  }
}

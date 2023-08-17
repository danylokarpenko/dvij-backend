import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTraitsTable1692270234456 implements MigrationInterface {
  name = 'CreateUserTraitsTable1692270234456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "userSkills"`);
    await queryRunner.query(`DROP TABLE "usertraits"`);
    await queryRunner.query(
      `CREATE TABLE "userTraits" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "userId" integer NOT NULL, "traitId" integer NOT NULL, CONSTRAINT "PK_8743c0ed65341d896cad50108b5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "userTraits" ADD CONSTRAINT "FK_4d12c258d3ae68da6d8e165e0de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "userTraits" ADD CONSTRAINT "FK_c4579d96dbddc1bc17b15a02513" FOREIGN KEY ("traitId") REFERENCES "traits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "userTraits" DROP CONSTRAINT "FK_c4579d96dbddc1bc17b15a02513"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userTraits" DROP CONSTRAINT "FK_4d12c258d3ae68da6d8e165e0de"`,
    );
    await queryRunner.query(`DROP TABLE "userTraits"`);
  }
}

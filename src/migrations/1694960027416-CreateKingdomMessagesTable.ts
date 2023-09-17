import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateKingdomMessagesTable1694960027416
  implements MigrationInterface
{
  name = 'CreateKingdomMessagesTable1694960027416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "kingdomMessage" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "text" character varying(1000) NOT NULL, "userId" integer NOT NULL, "replyToMessageId" integer, "kingdomId" integer NOT NULL, CONSTRAINT "PK_a67edf3e2c1ee84c22c98fe05f7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "traits" ADD "usersId" integer`);
    await queryRunner.query(
      `ALTER TABLE "traits" ADD CONSTRAINT "FK_162a81ab33aa5cf9c10e8040fc5" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "kingdomMessage" ADD CONSTRAINT "FK_10e83fc373d4bd6f9b35a39ec4d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "kingdomMessage" ADD CONSTRAINT "FK_42ed7fc5fb378eddcc654c946a2" FOREIGN KEY ("replyToMessageId") REFERENCES "kingdomMessage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "kingdomMessage" ADD CONSTRAINT "FK_8120f58737ef3c4cec487fe4430" FOREIGN KEY ("kingdomId") REFERENCES "kingdoms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kingdomMessage" DROP CONSTRAINT "FK_8120f58737ef3c4cec487fe4430"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kingdomMessage" DROP CONSTRAINT "FK_42ed7fc5fb378eddcc654c946a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kingdomMessage" DROP CONSTRAINT "FK_10e83fc373d4bd6f9b35a39ec4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "traits" DROP CONSTRAINT "FK_162a81ab33aa5cf9c10e8040fc5"`,
    );
    await queryRunner.query(`ALTER TABLE "traits" DROP COLUMN "usersId"`);
    await queryRunner.query(`DROP TABLE "kingdomMessage"`);
  }
}

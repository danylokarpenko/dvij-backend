import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateKingdomsTable1692360874098 implements MigrationInterface {
  name = 'CreateKingdomsTable1692360874098';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "userKingdoms" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "userId" integer NOT NULL, "kingdomId" integer NOT NULL, CONSTRAINT "PK_036150f69194963b9882441007f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "kingdoms" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "lat" numeric NOT NULL, "lng" numeric NOT NULL, "traitId" integer NOT NULL, CONSTRAINT "PK_1c579ab8ed833694f47bf0ab293" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "userKingdoms" ADD CONSTRAINT "FK_40a77825ef8dccc38a62bf1a4aa" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "userKingdoms" ADD CONSTRAINT "FK_62e657a544b26ca812f99fc6cb6" FOREIGN KEY ("kingdomId") REFERENCES "kingdoms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "userKingdoms" DROP CONSTRAINT "FK_62e657a544b26ca812f99fc6cb6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userKingdoms" DROP CONSTRAINT "FK_40a77825ef8dccc38a62bf1a4aa"`,
    );
    await queryRunner.query(`DROP TABLE "kingdoms"`);
    await queryRunner.query(`DROP TABLE "userKingdoms"`);
  }
}

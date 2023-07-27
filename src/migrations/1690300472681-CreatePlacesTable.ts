import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePlacesTable1690300472681 implements MigrationInterface {
  name = 'CreatePlacesTable1690300472681';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "places" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "photoUrl" character varying, "lat" numeric, "lng" numeric, "creatorId" integer, CONSTRAINT "REL_3be8f124c37385b25a898a45ed" UNIQUE ("creatorId"), CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_359b48411878a60ae7df2d5f25e" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "places" ADD CONSTRAINT "FK_3be8f124c37385b25a898a45ed2" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "places" DROP CONSTRAINT "FK_3be8f124c37385b25a898a45ed2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_359b48411878a60ae7df2d5f25e"`,
    );
    await queryRunner.query(`DROP TABLE "places"`);
  }
}

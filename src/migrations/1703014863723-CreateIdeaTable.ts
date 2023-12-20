import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIdeaTable1703014863723 implements MigrationInterface {
  name = 'CreateIdeaTable1703014863723';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ideas" ("id" SERIAL NOT NULL, "creatorId" integer NOT NULL, "description" text NOT NULL, "likes" integer NOT NULL DEFAULT '0', "isApproved" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6ab43f1e9b1cef0d8f3e56ce3a3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ADD "mainTask" character varying`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('owner', 'admin', 'worker')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "ideas" ADD CONSTRAINT "FK_753afab1e05471be79fa5d157b5" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ideas" DROP CONSTRAINT "FK_753afab1e05471be79fa5d157b5"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum_old" AS ENUM('admin', 'worker')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "mainTask"`);
    await queryRunner.query(`DROP TABLE "ideas"`);
  }
}

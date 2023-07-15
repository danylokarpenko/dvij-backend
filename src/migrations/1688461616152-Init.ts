import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1688461616152 implements MigrationInterface {
  name = 'Init1688461616152';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "skills" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "achievements" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "key" character varying NOT NULL, CONSTRAINT "PK_1bc19c37c6249f70186f318d71d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "userFriends" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "userId" integer NOT NULL, "friendId" integer NOT NULL, "respect" integer, CONSTRAINT "PK_8731643271cd26c0c9fd49acfef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "avatarUrl" character varying NOT NULL, "rating" numeric NOT NULL, "restrictionLvl" integer NOT NULL, "defaultLocation" character varying NOT NULL, "currentLocation" character varying NOT NULL, "lat" numeric NOT NULL, "lng" numeric NOT NULL, "refId" integer NOT NULL, "registered" boolean NOT NULL DEFAULT false, CONSTRAINT "REL_bb3f79687322b82f4b7c5ba17b" UNIQUE ("refId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "events" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "creatorId" integer, CONSTRAINT "REL_c621508a2b84ae21d3f971cdb4" UNIQUE ("creatorId"), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "userSkills" ("userId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_fa602ec272c0db522ad23e19640" PRIMARY KEY ("userId", "skillId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f79fafe8331cf7d2037a122b20" ON "userSkills" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4ce2d9e8d5833f9d4c3fdc5900" ON "userSkills" ("skillId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "userAchievements" ("userId" integer NOT NULL, "achievementId" integer NOT NULL, CONSTRAINT "PK_c4ddb738fd5f65517bb61bdeb19" PRIMARY KEY ("userId", "achievementId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f4dd75c06d5813e0f4e76ca014" ON "userAchievements" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d9bda1aa8e70391ca332050f10" ON "userAchievements" ("achievementId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "userEvents" ("userId" integer NOT NULL, "eventId" integer NOT NULL, CONSTRAINT "PK_a8302c8e3b82fe05946bc26836a" PRIMARY KEY ("userId", "eventId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2edf86b36db57018a1ed9db683" ON "userEvents" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a19a61fca8034371313316ad83" ON "userEvents" ("eventId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "userFriends" ADD CONSTRAINT "FK_c62bd60197c24d1b1a295d446e7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "userFriends" ADD CONSTRAINT "FK_231e4a6f61c5e2b5d230ed15894" FOREIGN KEY ("friendId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_bb3f79687322b82f4b7c5ba17b7" FOREIGN KEY ("refId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_c621508a2b84ae21d3f971cdb47" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "userSkills" ADD CONSTRAINT "FK_f79fafe8331cf7d2037a122b206" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "userSkills" ADD CONSTRAINT "FK_4ce2d9e8d5833f9d4c3fdc59009" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "userAchievements" ADD CONSTRAINT "FK_f4dd75c06d5813e0f4e76ca0143" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "userAchievements" ADD CONSTRAINT "FK_d9bda1aa8e70391ca332050f109" FOREIGN KEY ("achievementId") REFERENCES "achievements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "userEvents" ADD CONSTRAINT "FK_2edf86b36db57018a1ed9db6838" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "userEvents" ADD CONSTRAINT "FK_a19a61fca8034371313316ad83b" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "userEvents" DROP CONSTRAINT "FK_a19a61fca8034371313316ad83b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userEvents" DROP CONSTRAINT "FK_2edf86b36db57018a1ed9db6838"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userAchievements" DROP CONSTRAINT "FK_d9bda1aa8e70391ca332050f109"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userAchievements" DROP CONSTRAINT "FK_f4dd75c06d5813e0f4e76ca0143"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userSkills" DROP CONSTRAINT "FK_4ce2d9e8d5833f9d4c3fdc59009"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userSkills" DROP CONSTRAINT "FK_f79fafe8331cf7d2037a122b206"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_c621508a2b84ae21d3f971cdb47"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_bb3f79687322b82f4b7c5ba17b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userFriends" DROP CONSTRAINT "FK_231e4a6f61c5e2b5d230ed15894"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userFriends" DROP CONSTRAINT "FK_c62bd60197c24d1b1a295d446e7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a19a61fca8034371313316ad83"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2edf86b36db57018a1ed9db683"`,
    );
    await queryRunner.query(`DROP TABLE "userEvents"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d9bda1aa8e70391ca332050f10"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f4dd75c06d5813e0f4e76ca014"`,
    );
    await queryRunner.query(`DROP TABLE "userAchievements"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4ce2d9e8d5833f9d4c3fdc5900"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f79fafe8331cf7d2037a122b20"`,
    );
    await queryRunner.query(`DROP TABLE "userSkills"`);
    await queryRunner.query(`DROP TABLE "events"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "userFriends"`);
    await queryRunner.query(`DROP TABLE "achievements"`);
    await queryRunner.query(`DROP TABLE "skills"`);
  }
}

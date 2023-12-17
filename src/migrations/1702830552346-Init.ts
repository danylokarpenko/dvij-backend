import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1702830552346 implements MigrationInterface {
  name = 'Init1702830552346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "achievements" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "iconUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1bc19c37c6249f70186f318d71d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "talents" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "name" character varying NOT NULL, "iconUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8cecf07c0d624cc503d6a36df52" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "userPayRates" ("id" SERIAL NOT NULL, "payRate" numeric NOT NULL, "hoursWorked" numeric NOT NULL, "month" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_34d9a978eae8999c777e25328d0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "traits" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "iconUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3956071aa0a8eb8210aa1c6a563" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "gameUsers" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "gameId" integer NOT NULL, "isLead" boolean NOT NULL, "bonus" numeric DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_26c7130cbe27aba7f11666aa0fd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'worker', 'user')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "avatarUrl" character varying, "role" "public"."users_role_enum" NOT NULL, "jobTitle" character varying, "birthDayDate" date, "contacts" character varying, "payRate" numeric NOT NULL, "nextPayRateIncrease" numeric, "passwordHash" character varying NOT NULL, "refreshToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "iterations" ("id" SERIAL NOT NULL, "creatorId" integer NOT NULL, "description" text NOT NULL, "likes" integer NOT NULL DEFAULT '0', "isApproved" boolean NOT NULL DEFAULT false, "gameId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d62c93eaa6fc8129cb942633d12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "gameStatistics" ("id" SERIAL NOT NULL, "gameId" integer, "cpi" numeric, "pt" integer, "d1" integer, "d7" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bb1c57ca3ec10a0afddfc78e20c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "games" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "isHit" boolean NOT NULL DEFAULT false, "videoUrl" character varying NOT NULL, "iconUrl" character varying NOT NULL, "publisherName" character varying, "mainIdea" character varying, "iStoreLink" character varying, "googleStoreLink" character varying, "gitLink" character varying, "googleDriveLink" character varying, "trelloLink" character varying, "releaseDate" date, "lastPatchDate" date, "cpi" numeric, "pt" integer, "d1" integer, "d7" integer, "targetCpi" integer, "targetPt" integer, "targetRetD1" integer, "targetRetD7" integer, "dau" integer, "installs" integer, "malesGenderPercentage" integer, "minAge" integer, "maxAge" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "gameIncomes" ("id" SERIAL NOT NULL, "gameId" integer, "amount" numeric NOT NULL, "month" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_51510b958c133c2e6ceaac112c2" PRIMARY KEY ("id"))`,
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
    await queryRunner.query(
      `CREATE TABLE "users_achievements_achievements" ("usersId" integer NOT NULL, "achievementsId" integer NOT NULL, CONSTRAINT "PK_64679540a2d55999930a6aca99e" PRIMARY KEY ("usersId", "achievementsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_21dfe9c3c92f3b3e155a3b2f04" ON "users_achievements_achievements" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0db2ac59c500fd246d2ce8e258" ON "users_achievements_achievements" ("achievementsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "userTraits" ("userId" integer NOT NULL, "traitId" integer NOT NULL, CONSTRAINT "PK_05a9597bbdf74245b15dad9b56a" PRIMARY KEY ("userId", "traitId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4d12c258d3ae68da6d8e165e0d" ON "userTraits" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c4579d96dbddc1bc17b15a0251" ON "userTraits" ("traitId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "gameAchievements" ("gameId" integer NOT NULL, "achievementId" integer NOT NULL, CONSTRAINT "PK_551b4854a397cb1ee9cd5491cce" PRIMARY KEY ("gameId", "achievementId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_993297afc51fce0ee30d6b5bee" ON "gameAchievements" ("gameId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2c394501f43063ecefcdde7bc7" ON "gameAchievements" ("achievementId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "userPayRates" ADD CONSTRAINT "FK_927647dec6dfa1f524474949cb4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameUsers" ADD CONSTRAINT "FK_86fa07d0c80cceb293e6d59f01b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameUsers" ADD CONSTRAINT "FK_3bfa9c030d76978b74ef2a329c0" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD CONSTRAINT "FK_5e9ea97de80c51773e233fe417f" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" ADD CONSTRAINT "FK_db0bdec75f781b482b9cf9c00b8" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameStatistics" ADD CONSTRAINT "FK_36c27369c2f3bbf3428101d54f3" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameIncomes" ADD CONSTRAINT "FK_b35a48e4b8ad018472a9c096d8d" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_talents_talents" ADD CONSTRAINT "FK_c9d49a3eca7b76d43cbce0f11a0" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_talents_talents" ADD CONSTRAINT "FK_4704abb7c187a25183c1397ef8a" FOREIGN KEY ("talentsId") REFERENCES "talents"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_achievements_achievements" ADD CONSTRAINT "FK_21dfe9c3c92f3b3e155a3b2f040" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_achievements_achievements" ADD CONSTRAINT "FK_0db2ac59c500fd246d2ce8e2588" FOREIGN KEY ("achievementsId") REFERENCES "achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "userTraits" ADD CONSTRAINT "FK_4d12c258d3ae68da6d8e165e0de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "userTraits" ADD CONSTRAINT "FK_c4579d96dbddc1bc17b15a02513" FOREIGN KEY ("traitId") REFERENCES "traits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameAchievements" ADD CONSTRAINT "FK_993297afc51fce0ee30d6b5bee3" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameAchievements" ADD CONSTRAINT "FK_2c394501f43063ecefcdde7bc7c" FOREIGN KEY ("achievementId") REFERENCES "achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gameAchievements" DROP CONSTRAINT "FK_2c394501f43063ecefcdde7bc7c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameAchievements" DROP CONSTRAINT "FK_993297afc51fce0ee30d6b5bee3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userTraits" DROP CONSTRAINT "FK_c4579d96dbddc1bc17b15a02513"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userTraits" DROP CONSTRAINT "FK_4d12c258d3ae68da6d8e165e0de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_achievements_achievements" DROP CONSTRAINT "FK_0db2ac59c500fd246d2ce8e2588"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_achievements_achievements" DROP CONSTRAINT "FK_21dfe9c3c92f3b3e155a3b2f040"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_talents_talents" DROP CONSTRAINT "FK_4704abb7c187a25183c1397ef8a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_talents_talents" DROP CONSTRAINT "FK_c9d49a3eca7b76d43cbce0f11a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameIncomes" DROP CONSTRAINT "FK_b35a48e4b8ad018472a9c096d8d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameStatistics" DROP CONSTRAINT "FK_36c27369c2f3bbf3428101d54f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" DROP CONSTRAINT "FK_db0bdec75f781b482b9cf9c00b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iterations" DROP CONSTRAINT "FK_5e9ea97de80c51773e233fe417f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameUsers" DROP CONSTRAINT "FK_3bfa9c030d76978b74ef2a329c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameUsers" DROP CONSTRAINT "FK_86fa07d0c80cceb293e6d59f01b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userPayRates" DROP CONSTRAINT "FK_927647dec6dfa1f524474949cb4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2c394501f43063ecefcdde7bc7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_993297afc51fce0ee30d6b5bee"`,
    );
    await queryRunner.query(`DROP TABLE "gameAchievements"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c4579d96dbddc1bc17b15a0251"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4d12c258d3ae68da6d8e165e0d"`,
    );
    await queryRunner.query(`DROP TABLE "userTraits"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0db2ac59c500fd246d2ce8e258"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_21dfe9c3c92f3b3e155a3b2f04"`,
    );
    await queryRunner.query(`DROP TABLE "users_achievements_achievements"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4704abb7c187a25183c1397ef8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c9d49a3eca7b76d43cbce0f11a"`,
    );
    await queryRunner.query(`DROP TABLE "users_talents_talents"`);
    await queryRunner.query(`DROP TABLE "gameIncomes"`);
    await queryRunner.query(`DROP TABLE "games"`);
    await queryRunner.query(`DROP TABLE "gameStatistics"`);
    await queryRunner.query(`DROP TABLE "iterations"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "gameUsers"`);
    await queryRunner.query(`DROP TABLE "traits"`);
    await queryRunner.query(`DROP TABLE "userPayRates"`);
    await queryRunner.query(`DROP TABLE "talents"`);
    await queryRunner.query(`DROP TABLE "achievements"`);
  }
}

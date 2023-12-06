import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1701779736660 implements MigrationInterface {
  name = 'Init1701779736660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "achievements" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "iconUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1bc19c37c6249f70186f318d71d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "games" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "videoUrl" character varying NOT NULL, "iconUrl" character varying NOT NULL, "publisherUrl" character varying NOT NULL, "releaseDate" date NOT NULL, "lastPatchDate" date, "cpi" integer NOT NULL, "pt" integer NOT NULL, "retD1" integer NOT NULL, "retD7" integer NOT NULL, "targetCpi" integer NOT NULL, "targetPt" integer NOT NULL, "targetRetD1" integer NOT NULL, "targetRetD7" integer NOT NULL, "dau" integer NOT NULL, "installs" integer NOT NULL, "malesGenderPercentage" integer NOT NULL, "minAge" integer NOT NULL, "maxAge" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "iterations" ("id" SERIAL NOT NULL, "description" text NOT NULL, "likes" integer NOT NULL, "isApproved" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" integer, "hitId" integer, "gameId" integer, CONSTRAINT "PK_d62c93eaa6fc8129cb942633d12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "talent_entity" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "name" character varying NOT NULL, "iconUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_10a54350b8203be9eeafc8f95f2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "userPayRates" ("id" SERIAL NOT NULL, "payRate" numeric NOT NULL, "hoursWorked" numeric NOT NULL, "month" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_34d9a978eae8999c777e25328d0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "traits" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "iconUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3956071aa0a8eb8210aa1c6a563" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'worker')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "avatarUrl" character varying, "role" "public"."users_role_enum" NOT NULL, "jobTitle" character varying, "birthDayDate" date, "contacts" character varying, "payRate" numeric NOT NULL, "nextPayRateIncrease" numeric, "passwordHash" character varying NOT NULL, "refreshToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "userHits" ("id" SERIAL NOT NULL, "bonusPercentage" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "hitId" integer, CONSTRAINT "PK_f04ab18ea6ed4de75cfe7ca1965" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hits" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "videoUrl" character varying NOT NULL, "iconUrl" character varying NOT NULL, "publisherUrl" character varying NOT NULL, "releaseDate" date NOT NULL, "lastPatchDate" date, "cpi" integer NOT NULL, "pt" integer NOT NULL, "retD1" integer NOT NULL, "retD7" integer NOT NULL, "dau" integer NOT NULL, "installs" integer NOT NULL, "malesGenderPercentage" integer NOT NULL, "minAge" integer NOT NULL, "maxAge" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_035aa41badd42e65e058171f02e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hitIncomes" ("id" SERIAL NOT NULL, "amount" numeric NOT NULL, "month" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "hitId" integer, CONSTRAINT "PK_43535c02c342a14a161538ddaa8" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "users_talents_talent_entity" ("usersId" integer NOT NULL, "talentEntityId" integer NOT NULL, CONSTRAINT "PK_caad93a65cd2cd651e83ffc81bb" PRIMARY KEY ("usersId", "talentEntityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_12382cd669b5560df7ca1cdaa4" ON "users_talents_talent_entity" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_51fcb5d6754bb463197074ee35" ON "users_talents_talent_entity" ("talentEntityId") `,
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
      `CREATE TABLE "hitAchievements" ("hitId" integer NOT NULL, "achievementId" integer NOT NULL, CONSTRAINT "PK_dd48bdf634044bcccf8659f3677" PRIMARY KEY ("hitId", "achievementId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e6e8605cd9fda5abc023f670a1" ON "hitAchievements" ("hitId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_02e3b13ed72844aa3357ab7097" ON "hitAchievements" ("achievementId") `,
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
      `ALTER TABLE "userPayRates" ADD CONSTRAINT "FK_927647dec6dfa1f524474949cb4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "userHits" ADD CONSTRAINT "FK_5b1787273a0bd68b48139729bde" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "userHits" ADD CONSTRAINT "FK_d59e4737783df2e730a5a6430eb" FOREIGN KEY ("hitId") REFERENCES "hits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hitIncomes" ADD CONSTRAINT "FK_c51a89fdd032a2046e6c96abbe8" FOREIGN KEY ("hitId") REFERENCES "hits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameAchievements" ADD CONSTRAINT "FK_993297afc51fce0ee30d6b5bee3" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameAchievements" ADD CONSTRAINT "FK_2c394501f43063ecefcdde7bc7c" FOREIGN KEY ("achievementId") REFERENCES "achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_talents_talent_entity" ADD CONSTRAINT "FK_12382cd669b5560df7ca1cdaa42" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_talents_talent_entity" ADD CONSTRAINT "FK_51fcb5d6754bb463197074ee35b" FOREIGN KEY ("talentEntityId") REFERENCES "talent_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
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
      `ALTER TABLE "hitAchievements" ADD CONSTRAINT "FK_e6e8605cd9fda5abc023f670a13" FOREIGN KEY ("hitId") REFERENCES "hits"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "hitAchievements" ADD CONSTRAINT "FK_02e3b13ed72844aa3357ab70971" FOREIGN KEY ("achievementId") REFERENCES "achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hitAchievements" DROP CONSTRAINT "FK_02e3b13ed72844aa3357ab70971"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hitAchievements" DROP CONSTRAINT "FK_e6e8605cd9fda5abc023f670a13"`,
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
      `ALTER TABLE "users_talents_talent_entity" DROP CONSTRAINT "FK_51fcb5d6754bb463197074ee35b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_talents_talent_entity" DROP CONSTRAINT "FK_12382cd669b5560df7ca1cdaa42"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameAchievements" DROP CONSTRAINT "FK_2c394501f43063ecefcdde7bc7c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameAchievements" DROP CONSTRAINT "FK_993297afc51fce0ee30d6b5bee3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hitIncomes" DROP CONSTRAINT "FK_c51a89fdd032a2046e6c96abbe8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userHits" DROP CONSTRAINT "FK_d59e4737783df2e730a5a6430eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userHits" DROP CONSTRAINT "FK_5b1787273a0bd68b48139729bde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userPayRates" DROP CONSTRAINT "FK_927647dec6dfa1f524474949cb4"`,
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
      `DROP INDEX "public"."IDX_02e3b13ed72844aa3357ab7097"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e6e8605cd9fda5abc023f670a1"`,
    );
    await queryRunner.query(`DROP TABLE "hitAchievements"`);
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
      `DROP INDEX "public"."IDX_51fcb5d6754bb463197074ee35"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_12382cd669b5560df7ca1cdaa4"`,
    );
    await queryRunner.query(`DROP TABLE "users_talents_talent_entity"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2c394501f43063ecefcdde7bc7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_993297afc51fce0ee30d6b5bee"`,
    );
    await queryRunner.query(`DROP TABLE "gameAchievements"`);
    await queryRunner.query(`DROP TABLE "hitIncomes"`);
    await queryRunner.query(`DROP TABLE "hits"`);
    await queryRunner.query(`DROP TABLE "userHits"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "traits"`);
    await queryRunner.query(`DROP TABLE "userPayRates"`);
    await queryRunner.query(`DROP TABLE "talent_entity"`);
    await queryRunner.query(`DROP TABLE "iterations"`);
    await queryRunner.query(`DROP TABLE "games"`);
    await queryRunner.query(`DROP TABLE "achievements"`);
  }
}

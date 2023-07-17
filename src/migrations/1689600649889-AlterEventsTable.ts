import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterEventsTable1689600649889 implements MigrationInterface {
    name = 'AlterEventsTable1689600649889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "isCompetition" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "events" ADD "winnerId" integer`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "UQ_e5829fd74e2a1be58b570c17257" UNIQUE ("winnerId")`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_c621508a2b84ae21d3f971cdb47"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "creatorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_e5829fd74e2a1be58b570c17257" FOREIGN KEY ("winnerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_c621508a2b84ae21d3f971cdb47" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_c621508a2b84ae21d3f971cdb47"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_e5829fd74e2a1be58b570c17257"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "creatorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_c621508a2b84ae21d3f971cdb47" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "UQ_e5829fd74e2a1be58b570c17257"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "winnerId"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "isCompetition"`);
    }

}

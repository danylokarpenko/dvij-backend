import { MigrationInterface, QueryRunner } from "typeorm";

export class DropNullableRefId1689427905323 implements MigrationInterface {
    name = 'DropNullableRefId1689427905323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bb3f79687322b82f4b7c5ba17b7"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "refId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bb3f79687322b82f4b7c5ba17b7" FOREIGN KEY ("refId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bb3f79687322b82f4b7c5ba17b7"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "refId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bb3f79687322b82f4b7c5ba17b7" FOREIGN KEY ("refId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

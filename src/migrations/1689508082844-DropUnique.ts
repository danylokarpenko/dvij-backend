import { MigrationInterface, QueryRunner } from "typeorm";

export class DropUnique1689508082844 implements MigrationInterface {
    name = 'DropUnique1689508082844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_c621508a2b84ae21d3f971cdb47"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "creatorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_c621508a2b84ae21d3f971cdb47" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_c621508a2b84ae21d3f971cdb47"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "creatorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_c621508a2b84ae21d3f971cdb47" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

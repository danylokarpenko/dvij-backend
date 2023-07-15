import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGivenName1689428348829 implements MigrationInterface {
    name = 'AddGivenName1689428348829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userFriends" ADD "givenName" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "aiAvatarUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "aiAvatarUrl"`);
        await queryRunner.query(`ALTER TABLE "userFriends" DROP COLUMN "givenName"`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTrelloIdColumns1703452800929 implements MigrationInterface {
  name = 'AddTrelloIdColumns1703452800929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "trelloUserId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_a1af479402c04a34b4b9b65d3dc" UNIQUE ("trelloUserId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ADD "trelloBoardId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ADD CONSTRAINT "UQ_40d472c8c1f8d9dba5efa219c38" UNIQUE ("trelloBoardId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "games" DROP CONSTRAINT "UQ_40d472c8c1f8d9dba5efa219c38"`,
    );
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "trelloBoardId"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_a1af479402c04a34b4b9b65d3dc"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "trelloUserId"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsHitCOlumn1702212322802 implements MigrationInterface {
  name = 'AddIsHitCOlumn1702212322802';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "games" ADD "isHit" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gameUsers" DROP CONSTRAINT "FK_3bfa9c030d76978b74ef2a329c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameUsers" DROP CONSTRAINT "FK_86fa07d0c80cceb293e6d59f01b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameUsers" ALTER COLUMN "gameId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameUsers" ALTER COLUMN "userId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameUsers" ADD CONSTRAINT "FK_3bfa9c030d76978b74ef2a329c0" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameUsers" ADD CONSTRAINT "FK_86fa07d0c80cceb293e6d59f01b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "isHit"`);
  }
}

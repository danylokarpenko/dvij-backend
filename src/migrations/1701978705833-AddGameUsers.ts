import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGameUsers1701978705833 implements MigrationInterface {
  name = 'AddGameUsers1701978705833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gameUsers" ("id" SERIAL NOT NULL, "isLead" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "gameId" integer, CONSTRAINT "PK_26c7130cbe27aba7f11666aa0fd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameUsers" ADD CONSTRAINT "FK_86fa07d0c80cceb293e6d59f01b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameUsers" ADD CONSTRAINT "FK_3bfa9c030d76978b74ef2a329c0" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gameUsers" DROP CONSTRAINT "FK_3bfa9c030d76978b74ef2a329c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gameUsers" DROP CONSTRAINT "FK_86fa07d0c80cceb293e6d59f01b"`,
    );

    await queryRunner.query(`DROP TABLE "gameUsers"`);
  }
}

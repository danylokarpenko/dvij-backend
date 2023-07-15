import { MigrationInterface, QueryRunner } from 'typeorm';
import { AchievementEntity } from 'src/modules/achievements/achievement.entity';
import { AchievementKey } from 'src/infrastructure/enums/AchievementKey.enum';

const achievements = [
  {
    name: 'Invite friend',
    key: AchievementKey.UserInvited,
  },
  {
    name: 'Gain respect',
    key: AchievementKey.RespectGained,
  },
  {
    name: 'Dvij creator',
    key: AchievementKey.DvijCreated,
  },
];
export class SeedAchievementsTable1688461624653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const achievement of achievements) {
      await queryRunner.manager.insert(AchievementEntity, achievement);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const achievement of achievements) {
      await queryRunner.manager.delete(AchievementEntity, achievement);
    }
  }
}

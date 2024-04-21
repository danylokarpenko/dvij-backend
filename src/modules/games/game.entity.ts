// game.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { AchievementEntity } from '../achievements/achievement.entity';
import { IterationEntity } from '../iterations/iteration.entity';
import { GameUsersEntity } from '../gameUsers/gameUsers.entity';
import { GameStatisticEntity } from '../gameStatistic/gameStatistic.entity';
import { GameIncomeEntity } from '../gameIncomes/gameIncomes.entity';

@Entity('games')
export class GameEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  videoUrl: string;

  @Column({ type: 'varchar' })
  iconUrl: string;

  @Column({ type: 'boolean', default: false })
  isHit: boolean;

  @Column({ type: 'varchar', nullable: true, unique: true })
  trelloBoardId: string;

  @Column({ type: 'varchar', nullable: true })
  publisherName: string;

  @Column({ type: 'varchar', nullable: true })
  mainIdea: string;

  @Column({ type: 'varchar', nullable: true })
  mainTask: string;

  @Column({ type: 'varchar', nullable: true })
  iStoreLink: string;

  @Column({ type: 'varchar', nullable: true })
  googleStoreLink: string;

  @Column({ type: 'varchar', nullable: true })
  gitLink: string;

  @Column({ type: 'varchar', nullable: true })
  googleDriveLink: string;

  @Column({ type: 'varchar', nullable: true })
  trelloLink: string;

  @Column({ type: 'date', nullable: true })
  releaseDate: Date;

  @Column({ type: 'date', nullable: true })
  lastPatchDate: Date;

  @Column({ type: 'decimal', nullable: true })
  cpi: number; // cents

  @Column({ type: 'int', nullable: true })
  pt: number; // seconds

  @Column({ type: 'int', nullable: true })
  d1: number; // percentages

  @Column({ type: 'int', nullable: true })
  d7: number; // percentages

  @Column({ type: 'int', nullable: true })
  targetCpi: number; // cents

  @Column({ type: 'int', nullable: true })
  targetPt: number; // seconds

  @Column({ type: 'int', nullable: true })
  targetRetD1: number; // percentages

  @Column({ type: 'int', nullable: true })
  targetRetD7: number; // percentages

  @Column({ type: 'int', nullable: true })
  dau: number;

  @Column({ type: 'int', nullable: true })
  installs: number;

  @Column({ type: 'int', nullable: true })
  malesGenderPercentage: number;

  @Column({ type: 'int', nullable: true })
  minAge: number;

  @Column({ type: 'int', nullable: true })
  maxAge: number;

  @ManyToMany(() => AchievementEntity)
  @JoinTable({
    name: 'gameAchievements', // The name of the join table
    joinColumn: { name: 'gameId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'achievementId', referencedColumnName: 'id' },
  })
  achievements: AchievementEntity[];

  @OneToMany(() => GameIncomeEntity, (gameIncome) => gameIncome.game)
  gameIncomes: GameIncomeEntity[];

  @OneToMany(() => GameUsersEntity, (gameUser) => gameUser.game)
  gameUsers: GameUsersEntity[];

  @OneToMany(() => GameStatisticEntity, (gameStatistic) => gameStatistic.game)
  gameStatistics: GameStatisticEntity[];

  @OneToMany(() => IterationEntity, (iteration) => iteration.game)
  iterations: IterationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

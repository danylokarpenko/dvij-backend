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

  @Column({ type: 'varchar' })
  publisherUrl: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ type: 'date', nullable: true })
  lastPatchDate: Date;

  @Column({ type: 'int' })
  cpi: number; // cents

  @Column({ type: 'int' })
  pt: number; // seconds

  @Column({ type: 'int' })
  retD1: number; // percentages

  @Column({ type: 'int' })
  retD7: number; // percentages

  @Column({ type: 'int' })
  targetCpi: number; // cents

  @Column({ type: 'int' })
  targetPt: number; // seconds

  @Column({ type: 'int' })
  targetRetD1: number; // percentages

  @Column({ type: 'int' })
  targetRetD7: number; // percentages

  @Column({ type: 'int' })
  dau: number;

  @Column({ type: 'int' })
  installs: number;

  @Column({ type: 'int' })
  malesGenderPercentage: number;

  @Column({ type: 'int' })
  minAge: number;

  @Column({ type: 'int' })
  maxAge: number;

  @ManyToMany(() => AchievementEntity)
  @JoinTable({
    name: 'gameAchievements', // The name of the join table
    joinColumn: { name: 'gameId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'achievementId', referencedColumnName: 'id' },
  })
  achievements: AchievementEntity[];

  @OneToMany(() => IterationEntity, (iteration) => iteration.game)
  iterations: IterationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

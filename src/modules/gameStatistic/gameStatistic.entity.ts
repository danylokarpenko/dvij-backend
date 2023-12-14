// game-income.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GameEntity } from '../games/game.entity';

@Entity('gameStatistics')
export class GameStatisticEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GameEntity, (game) => game.gameStatistics)
  game: GameEntity;
  @Column({ nullable: true })
  gameId: number;

  @Column({ type: 'decimal', nullable: true })
  cpi: number; // cents

  @Column({ type: 'int', nullable: true })
  pt: number; // seconds

  @Column({ type: 'int', nullable: true })
  d1: number; // percentages

  @Column({ type: 'int', nullable: true })
  d7: number; // percentages

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

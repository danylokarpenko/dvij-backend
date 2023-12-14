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

@Entity('gameIncomes')
export class GameIncomeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GameEntity, (game) => game.gameIncomes)
  game: GameEntity;
  @Column({ nullable: true })
  gameId: number;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'date' })
  month: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

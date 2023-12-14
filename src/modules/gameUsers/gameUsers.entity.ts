// user-pay-rate.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { GameEntity } from '../games/game.entity';

@Entity('gameUsers')
export class GameUsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.gameUsers)
  user: UserEntity;
  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => GameEntity, (game) => game.gameUsers)
  game: GameEntity;
  @Column({ nullable: false })
  gameId: number;

  @Column({ type: 'boolean' })
  isLead: boolean;

  @Column({ type: 'decimal', default: 0, nullable: true })
  bonus: number;

  @CreateDateColumn()
  createdAt: Date;
}

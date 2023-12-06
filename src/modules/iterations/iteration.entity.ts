import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import { UserEntity } from '../users/user.entity';
import { HitEntity } from '../hits/hit.entity';
import { GameEntity } from '../games/game.entity';

@Entity('iterations')
export class IterationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.iterations)
  creator: UserEntity;
  @Column()
  creatorId: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  likes: number;

  @Column({ type: 'boolean' })
  isApproved: boolean;

  @ManyToOne(() => HitEntity, (hit) => hit.iterations)
  hit: HitEntity;
  @Column()
  hitId: number;

  @ManyToOne(() => GameEntity, (game) => game.iterations)
  game: GameEntity;
  @Column()
  gameId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

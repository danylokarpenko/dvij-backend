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
import { HitEntity } from '../hits/hits.entity';
import { GameEntity } from '../games/games.entity';

@Entity()
export class IterationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.iterations)
  creator: UserEntity;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  likes: number;

  @Column({ type: 'boolean' })
  isApproved: boolean;

  @ManyToOne(() => HitEntity, (hit) => hit.iterations)
  hit: HitEntity;

  @ManyToOne(() => GameEntity, (game) => game.iterations)
  game: GameEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

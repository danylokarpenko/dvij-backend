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

  @Column({ type: 'int', default: 0 })
  likes: number;

  @Column({ type: 'boolean', default: false })
  isApproved: boolean;

  @ManyToOne(() => GameEntity, (game) => game.iterations)
  game: GameEntity;
  @Column({ nullable: true })
  gameId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

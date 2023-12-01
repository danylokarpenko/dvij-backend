// user-hits.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { HitEntity } from '../hits/hits.entity';

@Entity('userHits')
export class UserHitsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.userHits)
  user: UserEntity;

  @ManyToOne(() => HitEntity, (hit) => hit.userHits)
  hit: HitEntity;

  @Column({ type: 'decimal' })
  bonusPercentage: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

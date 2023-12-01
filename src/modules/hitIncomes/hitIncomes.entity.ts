// hit-income.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HitEntity } from '../hits/hits.entity';

@Entity('hitIncomes')
export class HitIncomeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => HitEntity, (hit) => hit.hitIncomes)
  hit: HitEntity;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'date' })
  month: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

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

@Entity('userPayRates')
export class UserPayRateEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.payRates)
  user: UserEntity;

  @Column({ type: 'decimal' })
  payRate: number;

  @Column({ type: 'decimal' })
  hoursWorked: number;

  @Column({ type: 'date' })
  month: Date;

  @CreateDateColumn()
  createdAt: Date;
}

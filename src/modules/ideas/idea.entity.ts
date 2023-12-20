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

@Entity('ideas')
export class IdeaEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.ideas)
  creator: UserEntity;
  @Column()
  creatorId: number;

  @Column({ type: 'text' })
  description: string;

  @Column('int', { array: true, default: [] })
  likes: number[];

  @Column({ type: 'boolean', default: false })
  isApproved: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

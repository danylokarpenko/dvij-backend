import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { ParentEntity } from 'src/infrastructure/type/parent.entity';

@Entity('events')
export class EventEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  creator: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.events)
  users: UserEntity[];
}

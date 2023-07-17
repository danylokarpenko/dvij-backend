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

  @Column({ default: false })
  isCompetition: boolean;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  winner: UserEntity;
  @Column({ unique: false, nullable: true })
  winnerId: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  creator: UserEntity;
  @Column({ unique: false })
  creatorId: number;

  @ManyToMany(() => UserEntity, (user) => user.events)
  users: UserEntity[];
}

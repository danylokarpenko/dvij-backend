import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { ParentEntity } from 'src/infrastructure/type/parent.entity';
import { EventEntity } from '../events/event.entity';

@Entity('places')
export class PlaceEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ type: 'numeric', nullable: true })
  lat: number;

  @Column({ type: 'numeric', nullable: true })
  lng: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  creator: UserEntity;
  @Column({ unique: false, nullable: true })
  creatorId: number;

  @OneToMany(() => EventEntity, (event) => event.place)
  events: EventEntity[];
}

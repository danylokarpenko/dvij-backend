import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { ParentEntity } from 'src/infrastructure/type/parent.entity';
import { KingdomEntity } from '../kingdoms/kingdom.entity';

@Entity('traits')
export class TraitEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserEntity, (user) => user.traits)
  users: UserEntity[];

  @OneToMany(() => KingdomEntity, (kingdom) => kingdom.trait)
  kingdom: KingdomEntity[];
}

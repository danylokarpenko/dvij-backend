import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => UserEntity, (user) => user.traits)
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => KingdomEntity, (kingdom) => kingdom.trait)
  kingdom: KingdomEntity[];
}

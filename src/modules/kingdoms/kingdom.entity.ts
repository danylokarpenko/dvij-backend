import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ParentEntity } from 'src/infrastructure/type/parent.entity';
import { UserKingdomsEntity } from '../userKingdoms/userKingdom.entity';
import { TraitEntity } from '../traits/trait.entity';

@Entity('kingdoms')
export class KingdomEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'numeric', nullable: false })
  lat: number;

  @Column({ type: 'numeric', nullable: false })
  lng: number;

  @OneToMany(() => UserKingdomsEntity, (userToKingdom) => userToKingdom.kingdom)
  userKingdoms: UserKingdomsEntity[];

  @OneToMany(() => TraitEntity, (trait) => trait.kingdom)
  @JoinColumn()
  trait: TraitEntity;
  @Column({ unique: false, nullable: false })
  traitId: number;
}

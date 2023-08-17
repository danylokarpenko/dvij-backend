import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ParentEntity } from 'src/infrastructure/type/parent.entity';
import { UserEntity } from '../users/user.entity';
import { TraitEntity } from '../traits/trait.entity';

@Entity('userTraits')
export class UserTraitsEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: false })
  userId: number;

  @Column({ nullable: false, unique: false })
  traitId: number;

  @ManyToOne(() => UserEntity, (user) => user.friends)
  user: UserEntity;

  @ManyToOne(() => TraitEntity, (trait) => trait.users)
  trait: UserEntity;
}

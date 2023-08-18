import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ParentEntity } from 'src/infrastructure/type/parent.entity';
import { UserEntity } from '../users/user.entity';
import { KingdomEntity } from '../kingdoms/kingdom.entity';

@Entity('userKingdoms')
export class UserKingdomsEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: false })
  userId: number;

  @Column({ nullable: false, unique: false })
  kingdomId: number;

  @ManyToOne(() => UserEntity, (user) => user.kingdoms)
  user: UserEntity;

  @ManyToOne(() => KingdomEntity, (kingdom) => kingdom.userKingdoms)
  kingdom: KingdomEntity;
}

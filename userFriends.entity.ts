import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ParentEntity } from 'src/infrastructure/type/parent.entity';
import { UserEntity } from '../users/user.entity';

@Entity('userFriends')
export class UserFriendsEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: false })
  userId: number;

  @Column({ nullable: false, unique: false })
  friendId: number;

  @Column({ type: 'int', default: null, nullable: true })
  respect: number;

  @Column({ nullable: true })
  givenName: string;

  @ManyToOne(() => UserEntity, (user) => user.friends)
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.friends)
  friend: UserEntity;
}

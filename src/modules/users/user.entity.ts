import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  RelationId,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ type: 'numeric' })
  rating: number;

  @ManyToMany(() => UserEntity, (user) => user.friends)
  @JoinTable({
    name: 'userFriends',
    joinColumns: [{ name: 'userId' }],
    inverseJoinColumns: [{ name: 'friendId' }],
  })
  friends: UserEntity[];
  @RelationId((user: UserEntity) => user.friends)
  friendsIds: string[];
}

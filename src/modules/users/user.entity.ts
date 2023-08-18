import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { TraitEntity } from '../traits/trait.entity';
import { ParentEntity } from 'src/infrastructure/type/parent.entity';
import { EventEntity } from '../events/event.entity';
import { AchievementEntity } from '../achievements/achievement.entity';
import { UserFriendsEntity } from '../userFriends/userFriends.entity';
import { UserTraitsEntity } from '../userTraits/userTraits.entity';

@Entity('users')
export class UserEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'numeric', nullable: true })
  lat: number;

  @Column({ type: 'numeric', nullable: true })
  lng: number;

  @Column({ nullable: false, select: false })
  passwordHash: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  aiAvatarUrl: string;

  @Column({ type: 'numeric', nullable: true })
  rating: number;

  @Column({ type: 'int', default: 0 })
  restrictionLvl: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  ref: UserEntity;
  @Column({ unique: false, nullable: true })
  refId: number;

  @Column({ default: false })
  registered: boolean;

  @OneToMany(() => UserTraitsEntity, (userTrait) => userTrait.user)
  public traits: UserTraitsEntity[];

  @ManyToMany(() => AchievementEntity, (achievement) => achievement.users, {
    cascade: true,
  })
  @JoinTable({
    name: 'userAchievements',
    joinColumns: [{ name: 'userId' }],
    inverseJoinColumns: [{ name: 'achievementId' }],
  })
  achievements: AchievementEntity[];

  @ManyToMany(() => EventEntity, (event) => event.users)
  @JoinTable({
    name: 'userEvents',
    joinColumns: [{ name: 'userId' }],
    inverseJoinColumns: [{ name: 'eventId' }],
  })
  events: EventEntity[];

  @OneToMany(() => UserFriendsEntity, (userFriend) => userFriend.friend)
  public friends: UserFriendsEntity[];
}

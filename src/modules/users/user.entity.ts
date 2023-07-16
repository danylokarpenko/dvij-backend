import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  RelationId,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { SkillEntity } from '../skills/skill.entity';
import { ParentEntity } from 'src/infrastructure/type/parent.entity';
import { EventEntity } from '../events/event.entity';
import { AchievementEntity } from '../achievements/achievement.entity';
import { UserFriendsEntity } from '../userFriends/userFriends.entity';

@Entity('users')
export class UserEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: false, select: false })
  passwordHash: string;

  @Column()
  avatarUrl: string;

  @Column({ nullable: true })
  aiAvatarUrl: string;

  @Column({ type: 'numeric' })
  rating: number;

  @Column({ type: 'int' })
  restrictionLvl: number;

  @Column()
  defaultLocation: string;

  @Column()
  currentLocation: string;

  @Column({ type: 'numeric' })
  lat: number;

  @Column({ type: 'numeric' })
  lng: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  ref: UserEntity;
  @Column({ unique: false, nullable: true })
  refId: number;

  @Column({ default: false })
  registered: boolean;

  @ManyToMany(() => SkillEntity, (skill) => skill.users)
  @JoinTable({
    name: 'userSkills',
    joinColumns: [{ name: 'userId' }],
    inverseJoinColumns: [{ name: 'skillId' }],
  })
  skills: SkillEntity[];

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

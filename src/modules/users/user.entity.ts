import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import { UserRoleEnum } from 'src/infrastructure/enums/UserRoleEnum.enum';
import { IterationEntity } from '../iterations/iteration.entity';
import { TalentEntity } from '../talents/talent.entity';

import { AchievementEntity } from '../achievements/achievement.entity';
import { UserHitsEntity } from '../userHits/userHit.entity';
import { UserPayRateEntity } from '../userPayRates/userPayRate.entity';
import { TraitEntity } from '../traits/trait.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  avatarUrl: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
  })
  role: UserRoleEnum;

  @Column({ type: 'varchar', nullable: true })
  jobTitle: string;

  @Column({ type: 'date', nullable: true })
  birthDayDate: Date;

  @Column({ type: 'varchar', nullable: true })
  contacts: string;

  @Column({ type: 'decimal' })
  payRate: number;

  @Column({ type: 'decimal', nullable: true })
  nextPayRateIncrease: number;

  @Column({ nullable: false, select: false })
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => TalentEntity)
  @JoinTable()
  talents: TalentEntity[];

  @OneToMany(() => IterationEntity, (iteration) => iteration.creator)
  iterations: IterationEntity[];

  @ManyToMany(() => AchievementEntity)
  @JoinTable()
  achievements: AchievementEntity[];

  @OneToMany(() => UserHitsEntity, (userHits) => userHits.user)
  userHits: UserHitsEntity[];

  @OneToMany(() => UserPayRateEntity, (payRate) => payRate.user)
  payRates: UserPayRateEntity[];

  @ManyToMany(() => TraitEntity, (trait) => trait.users)
  @JoinTable({
    name: 'userTraits',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'traitId', referencedColumnName: 'id' },
  })
  traits: TraitEntity[];
}

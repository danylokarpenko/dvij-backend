import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserHitsEntity } from '../userHits/userHit.entity';
import { AchievementEntity } from '../achievements/achievement.entity';
import { IterationEntity } from '../iterations/iteration.entity';
import { HitIncomeEntity } from '../hitIncomes/hitIncome.entity';

@Entity('hits')
export class HitEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  videoUrl: string;

  @Column({ type: 'varchar' })
  iconUrl: string;

  @Column({ type: 'varchar' })
  publisherUrl: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ type: 'date', nullable: true })
  lastPatchDate: Date;

  @Column({ type: 'int' })
  cpi: number; // cents

  @Column({ type: 'int' })
  pt: number; // seconds

  @Column({ type: 'int' })
  retD1: number; // percentages

  @Column({ type: 'int' })
  retD7: number; // percentages

  @Column({ type: 'int' })
  dau: number;

  @Column({ type: 'int' })
  installs: number;

  @Column({ type: 'int' })
  malesGenderPercentage: number;

  @Column({ type: 'int' })
  minAge: number;

  @Column({ type: 'int' })
  maxAge: number;

  @OneToMany(() => UserHitsEntity, (userHits) => userHits.hit)
  userHits: UserHitsEntity[];

  @ManyToMany(() => AchievementEntity)
  @JoinTable({
    name: 'hitAchievements', // The name of the join table
    joinColumn: { name: 'hitId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'achievementId', referencedColumnName: 'id' },
  })
  achievements: AchievementEntity[];

  @OneToMany(() => IterationEntity, (iteration) => iteration.hit)
  iterations: IterationEntity[];

  @OneToMany(() => HitIncomeEntity, (hitIncome) => hitIncome.hit)
  hitIncomes: HitIncomeEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

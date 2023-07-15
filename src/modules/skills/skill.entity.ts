import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { ParentEntity } from 'src/infrastructure/type/parent.entity';

@Entity('skills')
export class SkillEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.skills)
  users: UserEntity[];
}

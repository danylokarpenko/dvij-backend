import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ParentEntity } from 'src/infrastructure/type/parent.entity';
import { UserEntity } from '../users/user.entity';
import { KingdomEntity } from '../kingdoms/kingdom.entity';

@Entity('kingdomMessage')
export class KingdomMessageEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1000 })
  text: string;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  user: UserEntity;
  @Column({ nullable: false, unique: false })
  userId: number;

  @ManyToOne(() => KingdomMessageEntity, (message) => message.replyToMessage)
  replyToMessage: KingdomMessageEntity;
  @Column({ nullable: true, unique: false })
  replyToMessageId: number;

  @ManyToOne(() => KingdomEntity, (kingdom) => kingdom.messages)
  kingdom: KingdomEntity;
  @Column({ nullable: false, unique: false })
  kingdomId: number;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KingdomMessagesService } from './kingdomMessages.service';
import { KingdomMessagesController } from './kingdomMessages.controller';
import { KingdomMessageEntity } from './kingdomMessage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KingdomMessageEntity])],
  controllers: [KingdomMessagesController],
  providers: [KingdomMessagesService],
})
export class KingdomMessagesModule {}

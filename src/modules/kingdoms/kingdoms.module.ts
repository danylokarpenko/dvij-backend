import { Module } from '@nestjs/common';
import { KingdomsService } from './kingdoms.service';
import { KingdomsController } from './kingdoms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KingdomEntity } from './kingdom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KingdomEntity])],
  controllers: [KingdomsController],
  providers: [KingdomsService],
})
export class KingdomsModule {}

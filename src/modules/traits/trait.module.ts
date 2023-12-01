import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraitEntity } from './trait.entity';
import { TraitService } from './trait.service';
import { TraitController } from './trait.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TraitEntity])],
  controllers: [TraitController],
  providers: [TraitService],
})
export class TraitsModule {}

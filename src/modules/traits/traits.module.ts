import { Module } from '@nestjs/common';
import { TraitsService } from './traits.service';
import { TraitsController } from './traits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraitEntity } from './trait.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TraitEntity])],
  controllers: [TraitsController],
  providers: [TraitsService],
})
export class TraitsModule {}

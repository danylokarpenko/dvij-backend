import { Module } from '@nestjs/common';
import { HitIncomesService } from './userPayRates.service';
import { HitIncomesController } from './userPayRates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HitIncomeEntity } from './userPayRates.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([HitIncomeEntity]), UsersModule],
  controllers: [HitIncomesController],
  providers: [HitIncomesService],
})
export class HitIncomesModule {}

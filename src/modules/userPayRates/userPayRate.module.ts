// user-pay-rate.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPayRatesController } from './userPayRate.controller';
import { UserPayRatesService } from './userPayRate.service';
import { UserPayRateEntity } from './userPayRate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPayRateEntity])],
  controllers: [UserPayRatesController],
  providers: [UserPayRatesService],
})
export class UserPayRateModule {}

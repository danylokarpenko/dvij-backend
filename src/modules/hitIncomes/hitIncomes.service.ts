import { Injectable } from '@nestjs/common';
import { CreateHitIncomeDto } from './dto/create-hitIncome.dto';
import { UpdateHitIncomeDto } from './dto/update-hitIncome.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HitIncomeEntity } from './hitIncomes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HitIncomesService {
  constructor(
    @InjectRepository(HitIncomeEntity)
    private hitIncomesRepository: Repository<HitIncomeEntity>,
  ) {}

  create(createHitIncomeDto: CreateHitIncomeDto) {
    return this.hitIncomesRepository.create(createHitIncomeDto).save();
  }

  findAll() {
    return this.hitIncomesRepository.find();
  }

  findOne(id: number) {
    return this.hitIncomesRepository.findOneBy({ id });
  }

  async update(id: number, updateHitIncomeDto: UpdateHitIncomeDto) {
    const hitIncome = await this.findOne(id);
    const mappedHitIncome = Object.assign(hitIncome, updateHitIncomeDto);
    return this.hitIncomesRepository.update(id, mappedHitIncome);
  }

  remove(id: number) {
    return this.hitIncomesRepository.delete(id);
  }
}

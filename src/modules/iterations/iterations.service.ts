import { Injectable } from '@nestjs/common';
import { CreateIterationDto } from './dto/create-iteration.dto';
import { UpdateIterationDto } from './dto/update-iteration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IterationEntity } from './iterations.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IterationsService {
  constructor(
    @InjectRepository(IterationEntity)
    private iterationsRepository: Repository<IterationEntity>,
  ) {}

  create(createIterationDto: CreateIterationDto) {
    return this.iterationsRepository.create(createIterationDto).save();
  }

  findAll() {
    return this.iterationsRepository.find();
  }

  findOne(id: number) {
    return this.iterationsRepository.findOneBy({ id });
  }

  async update(id: number, updateIterationDto: UpdateIterationDto) {
    const iteration = await this.findOne(id);
    const mappedIteration = Object.assign(iteration, updateIterationDto);
    return this.iterationsRepository.update(id, mappedIteration);
  }

  remove(id: number) {
    return this.iterationsRepository.delete(id);
  }
}

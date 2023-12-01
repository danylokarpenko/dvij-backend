import { Injectable } from '@nestjs/common';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TalentEntity } from './talents.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TalentsService {
  constructor(
    @InjectRepository(TalentEntity)
    private talentsRepository: Repository<TalentEntity>,
  ) {}

  create(createTalentDto: CreateTalentDto) {
    return this.talentsRepository.create(createTalentDto).save();
  }

  findAll() {
    return this.talentsRepository.find();
  }

  findOne(id: number) {
    return this.talentsRepository.findOneBy({ id });
  }

  async update(id: number, updateTalentDto: UpdateTalentDto) {
    const talent = await this.findOne(id);
    const mappedTalent = Object.assign(talent, updateTalentDto);
    return this.talentsRepository.update(id, mappedTalent);
  }

  remove(id: number) {
    return this.talentsRepository.delete(id);
  }
}

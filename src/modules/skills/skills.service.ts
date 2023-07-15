import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from './skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillEntity)
    private skillsRepository: Repository<SkillEntity>,
  ) {}

  create(createSkillDto: CreateSkillDto) {
    return this.skillsRepository.create(createSkillDto).save();
  }

  findAll() {
    return this.skillsRepository.find();
  }

  findOne(id: number) {
    return this.skillsRepository.findOneBy({ id });
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const skill = await this.findOne(id);
    const mappedSkill = Object.assign(skill, updateSkillDto);
    return this.skillsRepository.update(id, mappedSkill);
  }

  remove(id: number) {
    return this.skillsRepository.delete(id);
  }
}

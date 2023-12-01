import { Injectable } from '@nestjs/common';
import { CreateHitDto } from './dto/create-hit.dto';
import { UpdateHitDto } from './dto/update-hit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HitEntity } from './hits.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HitsService {
  constructor(
    @InjectRepository(HitEntity)
    private hitsRepository: Repository<HitEntity>,
  ) {}

  create(createHitDto: CreateHitDto) {
    return this.hitsRepository.create(createHitDto).save();
  }

  findAll() {
    return this.hitsRepository.find();
  }

  findOne(id: number) {
    return this.hitsRepository.findOneBy({ id });
  }

  async update(id: number, updateHitDto: UpdateHitDto) {
    const hit = await this.findOne(id);
    const mappedHit = Object.assign(hit, updateHitDto);
    return this.hitsRepository.update(id, mappedHit);
  }

  remove(id: number) {
    return this.hitsRepository.delete(id);
  }
}

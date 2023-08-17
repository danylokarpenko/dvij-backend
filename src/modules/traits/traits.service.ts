import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTraitDto } from './dto/create-trait.dto';
import { UpdateTraitDto } from './dto/update-trait.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TraitEntity } from './trait.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class TraitsService {
  constructor(
    @InjectRepository(TraitEntity)
    private traitsRepository: Repository<TraitEntity>,
  ) {}

  async create(createTraitDto: CreateTraitDto) {
    const duplicate = await this.traitsRepository.findOne({
      where: { name: ILike(`%${createTraitDto.name}%`) },
    });
    if (duplicate) {
      throw new BadRequestException(
        `Trait with name '${createTraitDto.name}' already exist`,
      );
    }
    return this.traitsRepository.create(createTraitDto).save();
  }

  findAll() {
    return this.traitsRepository.find();
  }

  findOne(id: number) {
    return this.traitsRepository.findOneBy({ id });
  }

  async update(id: number, updateTraitDto: UpdateTraitDto) {
    const trait = await this.findOne(id);
    const mappedTrait = Object.assign(trait, updateTraitDto);
    return this.traitsRepository.update(id, mappedTrait);
  }

  remove(id: number) {
    return this.traitsRepository.delete(id);
  }
}

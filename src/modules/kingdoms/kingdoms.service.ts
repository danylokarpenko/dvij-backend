import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKingdomDto } from './dto/create-kingdom.dto';
import { UpdateKingdomDto } from './dto/update-kingdom.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { KingdomEntity } from './kingdom.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class KingdomsService {
  constructor(
    @InjectRepository(KingdomEntity)
    private kingdomsRepository: Repository<KingdomEntity>,
  ) {}

  async create(createKingdomDto: CreateKingdomDto) {
    const duplicate = await this.kingdomsRepository.findOne({
      where: { name: ILike(`%${createKingdomDto.name}%`) },
    });
    if (duplicate) {
      throw new BadRequestException(
        `Kingdom with name '${createKingdomDto.name}' already exist`,
      );
    }
    return this.kingdomsRepository.create(createKingdomDto).save();
  }

  findAll() {
    return this.kingdomsRepository.find();
  }

  findOne(id: number) {
    return this.kingdomsRepository.findOneBy({ id });
  }

  findOneBy(where: FindOptionsWhere<KingdomEntity>) {
    const { name, traitId } = where;
    return this.kingdomsRepository.findOneBy({
      ...(name && { name: ILike(name) }),
      ...(traitId && { traitId }),
    });
  }

  async update(id: number, updateKingdomDto: UpdateKingdomDto) {
    const kingdom = await this.findOne(id);
    const mappedKingdom = Object.assign(kingdom, updateKingdomDto);
    return this.kingdomsRepository.update(id, mappedKingdom);
  }

  remove(id: number) {
    return this.kingdomsRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

import { KingdomMessageEntity } from './kingdomMessage.entity';
import { CreateKingdomMessageDto } from './dto/create-kingdomMessage.dto';
import { UpdateKingdomMessageDto } from './dto/update-kingdomMessage.dto';

@Injectable()
export class KingdomMessagesService {
  constructor(
    @InjectRepository(KingdomMessageEntity)
    private kingdomsRepository: Repository<KingdomMessageEntity>,
  ) {}

  async create(createKingdomDto: CreateKingdomMessageDto) {
    return this.kingdomsRepository.create(createKingdomDto).save();
  }

  findAllBy(query) {
    const { text, userId, kingdomId, take = 100, skip = 0 } = query;
    return this.kingdomsRepository.find({
      where: {
        ...(text && { text: ILike(`%${text}%`) }),
        ...(userId && { userId }),
        ...(kingdomId && { kingdomId }),
      },
      take,
      skip,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.kingdomsRepository.findOneBy({ id });
  }

  findOneBy(where: FindOptionsWhere<KingdomMessageEntity>) {
    const { text, userId, kingdomId } = where;
    return this.kingdomsRepository.findOneBy({
      ...(text && { text: ILike(text) }),
      ...(userId && { userId }),
      ...(kingdomId && { kingdomId }),
    });
  }

  async update(id: number, updateKingdomDto: UpdateKingdomMessageDto) {
    const kingdom = await this.findOne(id);
    const mappedKingdom = Object.assign(kingdom, updateKingdomDto);
    return this.kingdomsRepository.update(id, mappedKingdom);
  }

  remove(id: number) {
    return this.kingdomsRepository.delete(id);
  }
}

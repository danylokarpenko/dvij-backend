import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceEntity } from './place.entity';
import { Repository } from 'typeorm';
import { GetPlaceQueryDto } from './dto/get-place-query.dto';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlaceEntity)
    private placesRepository: Repository<PlaceEntity>,
  ) {}

  create(createPlaceDto: CreatePlaceDto, req: IRequest) {
    const data = { ...createPlaceDto, creatorId: req.user.id };
    return this.placesRepository.create(data).save();
  }

  findAll(query: GetPlaceQueryDto, req: IRequest) {
    const { creatorId } = query;
    const {
      user: { id: currentUserId },
    } = req;
    const userId = creatorId || currentUserId;

    return this.placesRepository.find({
      where: {
        ...(creatorId && { creatorId: userId }),
      },
    });
  }

  findOne(id: number) {
    return this.placesRepository.findOneBy({ id });
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto) {
    const place = await this.findOne(id);
    const mappedPlace = Object.assign(place, updatePlaceDto);
    return this.placesRepository.update(id, mappedPlace);
  }

  remove(id: number) {
    return this.placesRepository.delete(id);
  }
}

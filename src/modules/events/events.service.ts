import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './event.entity';
import { Repository } from 'typeorm';
import { GetEventQueryDto } from './dto/get-event-query.dto';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private eventsRepository: Repository<EventEntity>,
  ) {}

  create(createEventDto: CreateEventDto, req: IRequest) {
    const data = { ...createEventDto, creatorId: req.user.id };
    return this.eventsRepository.create(data).save();
  }

  findAll(query: GetEventQueryDto, req: IRequest) {
    const { creatorId } = query;
    const {
      user: { id: currentUserId },
    } = req;
    const userId = creatorId || currentUserId;

    return this.eventsRepository.find({
      where: {
        ...(creatorId && { creatorId: userId }),
      },
    });
  }

  findOne(id: number) {
    return this.eventsRepository.findOneBy({ id });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);
    const mappedEvent = Object.assign(event, updateEventDto);
    return this.eventsRepository.update(id, mappedEvent);
  }

  remove(id: number) {
    return this.eventsRepository.delete(id);
  }
}

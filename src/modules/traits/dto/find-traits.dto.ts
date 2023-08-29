import { PickType } from '@nestjs/swagger';
import { TraitEntity } from '../trait.entity';

export class FindTraitsDto extends PickType(TraitEntity, ['name']) {}

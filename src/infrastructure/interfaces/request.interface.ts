import { Request } from 'express';
import { UserEntity } from 'src/modules/users/user.entity';

export interface IRequest extends Request {
  user: UserEntity;
}

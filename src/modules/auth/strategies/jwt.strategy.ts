import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/modules/users/user.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @InjectRepository(UserEntity)
  private _usersRepository: Repository<UserEntity>;

  constructor(private readonly connection: Connection) {
    super({
      usernameField: 'username',
      passwordField: 'password',

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
    // this._usersRepository = this.connection.getCustomRepository(UserEntity);
  }

  async validate(payload: any) {
    const { sub, username, roleId } = payload;
    // if (roleId === UserRole.Trader) {
    //   return payload;
    // }
    const { passwordHash, ...user } = await this._usersRepository.findOneBy({
      username,
    });
    return { id: sub, ...user };
  }
}

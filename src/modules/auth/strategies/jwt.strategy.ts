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
    const token = ExtractJwt.fromAuthHeaderAsBearerToken();

    super({
      usernameField: 'email',
      passwordField: 'password',

      jwtFromRequest: token,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const { sub, email } = payload;
    const user = await this._usersRepository.findOneBy({
      email,
    });

    delete user.passwordHash;

    return { id: sub, ...user };
  }
}

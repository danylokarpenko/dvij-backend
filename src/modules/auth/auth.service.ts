// eslint-disable-next-line
const bcrypt = require('bcryptjs');
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsernameWithPassword(username);
    if (!user) {
      throw new NotFoundException('INVALID_USERNAME_OR_PASSWORD');
    }
    const match = await bcrypt.compare(pass, user.passwordHash);
    if (user && match) {
      // eslint-disable-next-line
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(req: any) {
    const { id, username, firstName, lastName } = req.user;
    const payload = { sub: id, username, firstName, lastName };
    return {
      access_token: this.jwtService.sign(payload),
      user: req.user,
    };
  }

  async signUp(userPayload: SignupDto) {
    const saltOrRounds = 10;
    const { password, ...userData } = userPayload;
    const passwordHash = await bcrypt.hash(password, saltOrRounds);
    const user = await this.usersService.register({
      ...userData,
      passwordHash,
    });

    return {
      access_token: this.jwtService.sign(userPayload),
      user,
    };
  }

  async generateToken(payload: any, expiresTime = '5h') {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: expiresTime,
    });
  }

  async decodeToken(accessToken: string) {
    const decodedToken = await this.jwtService.decode(accessToken);
    return decodedToken;
  }

  async verifyToken(accessToken: string): Promise<boolean> {
    try {
      await this.jwtService.verify(accessToken);
      return true;
    } catch (e) {
      return false;
    }
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    const userId = payload.sub;

    if (userId) {
      return this.usersService.findOne(userId);
    }
  }
}

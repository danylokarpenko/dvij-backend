// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcryptjs = require('bcryptjs');

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByWithPassword({ email });
    if (!user) {
      throw new HttpException(
        'Authentication failed. Please check your credentials.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const match = await bcryptjs.compare(pass, user.passwordHash);
    if (user && match) {
      delete user.passwordHash;
      return user;
    }
    throw new HttpException(
      'Authentication failed. Please check your credentials.',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async login(userPayload: LoginDto) {
    // Find the user by email
    const user = await this.userService.findByWithPassword({
      email: userPayload.email,
    });

    // Check if user exists
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify the password
    const isPasswordMatching = await bcryptjs.compare(
      userPayload.password,
      user.passwordHash,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(userPayload);
    const refreshToken = await this.generateRefreshToken(userPayload);

    return { accessToken, refreshToken, user };
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    const userId = this.getUserIdFromRefreshToken(refreshToken);
    if (!userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.findOne(userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newAccessToken = this.generateAccessToken(user);

    return { accessToken: newAccessToken };
  }

  private generateAccessToken(user: any) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }

  async generateRefreshToken(user: any): Promise<string> {
    const payload = { sub: user.id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    await this.saveRefreshToken(user.id, refreshToken);

    return refreshToken;
  }

  private getUserIdFromRefreshToken(refreshToken: string): number | null {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return decoded.sub;
    } catch (e) {
      return null;
    }
  }

  private async saveRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    await this.userService.updateUserRefreshToken(userId, refreshToken);
  }

  async signUp(userPayload: CreateUserDto) {
    const user = await this.userService.create(userPayload);
    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    return { accessToken, refreshToken, user };
  }

  async logout(userId: number): Promise<void> {
    await this.userService.invalidateRefreshToken(userId);
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    const userId = payload.sub;

    if (userId) {
      return this.userService.findOne(userId);
    }
  }
}

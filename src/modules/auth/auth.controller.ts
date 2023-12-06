import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginDto } from './dto/login.dto';
import { SchemaValidationPipe } from 'src/infrastructure/pipes/schema_validation.pipe';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login to account' })
  @Post('login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Sign Up' })
  @ApiResponse({ status: 200, description: 'Sign up new user' })
  @Post('/signup')
  async createUser(
    @Body(new SchemaValidationPipe(CreateUserDto)) userPayload: CreateUserDto,
  ) {
    const result = await this.authService.signUp(userPayload);
    return result;
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshTokenDto) {
    return this.authService.refreshAccessToken(body.refreshToken);
  }

  @Post('logout')
  async logout(@Body() body: LogoutDto) {
    return this.authService.logout(body.userId);
  }
}

import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntity } from '../users/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { SchemaValidationPipe } from 'src/infrastructure/pipes/schema_validation.pipe';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login to account' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  // eslint-disable-next-line
  async login(@Request() req, @Body() _user: LoginDto) {
    return this.authService.login(req);
  }

  @ApiOperation({ summary: 'Sign Up' })
  @ApiResponse({ status: 200, description: 'Sign up new user' })
  @Post('/signup')
  async createUser(
    @Body(new SchemaValidationPipe(SignupDto)) userPayload: SignupDto,
  ) {
    const result = await this.authService.signUp(userPayload);
    return result;
  }
}

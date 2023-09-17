import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
/*
    Custom imports for AuthService, jwt secret, etc...
*/
import { AuthService } from '../auth.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const auth_token = context.switchToWs().getData().auth_token;

    const user = await this.authService.getUserFromAuthenticationToken(
      auth_token,
    );

    // Bonus if you need to access your user after the guard
    context.switchToWs().getData().user = user;
    return Boolean(user);
  }
}

import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class KingdomChatService {
  constructor(private authService: AuthService) {}

  async getUserFromSocket(socket, metaData) {
    const auth_token =
      metaData.headers.authorization ||
      metaData.headers['sec-websocket-protocol'];

    const user = await this.authService.getUserFromAuthenticationToken(
      auth_token,
    );

    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }
}

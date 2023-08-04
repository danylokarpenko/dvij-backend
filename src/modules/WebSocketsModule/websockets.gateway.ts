import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';

@WebSocketGateway(3030)
export class WebsocketsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('websockets')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'websockets', data: item })),
    );
  }
}

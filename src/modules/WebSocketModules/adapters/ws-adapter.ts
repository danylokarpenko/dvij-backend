import * as WebSocket from 'ws';
import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common';
import {
  MessageMappingProperties,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';

export class WsAdapter
  implements WebSocketAdapter, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() private server: any;
  constructor(private app: INestApplicationContext) {}
  wsClients = [];
  afterInit() {
    console.log('Init');

    this.server.emit('testing', { do: 'stuff' });
  }

  handleConnection(client: any) {
    console.log('handleConnection');

    this.wsClients.push(client);
  }

  handleDisconnect(client) {
    console.log('handleDisconnect');

    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
    this.broadcast('disconnect', {});
  }
  private broadcast(event, message: any) {
    console.log('broadcast');

    const broadCastMessage = JSON.stringify(message);
    for (const c of this.wsClients) {
      c.send(event, broadCastMessage);
    }
  }

  create(port: number, options: any = {}): any {
    console.log('create');

    return new WebSocket.Server({ port, ...options });
  }

  bindClientConnect(server, callback) {
    console.log('bindClientConnect');

    server.on('connection', callback);
  }

  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ) {
    console.log('bindMessageHandlers');

    fromEvent(client, 'message')
      .pipe(
        mergeMap((data) => this.bindMessageHandler(data, handlers, process)),
        filter((result) => result),
      )
      .subscribe((response) => client.send(JSON.stringify(response)));
  }

  bindMessageHandler(
    buffer,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ): Observable<any> {
    const message = JSON.parse(buffer.data);
    const messageHandler = handlers.find(
      (handler) => handler.message === message.event,
    );
    if (!messageHandler) {
      return EMPTY;
    }
    return process(messageHandler.callback(message.data));
  }

  close(server) {
    server.close();
  }
}

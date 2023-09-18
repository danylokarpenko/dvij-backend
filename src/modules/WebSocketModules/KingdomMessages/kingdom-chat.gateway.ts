import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { KingdomChatService } from './kingdom-chat.service';
import { KingdomMessagesService } from 'src/modules/kingdomMessages/kingdomMessages.service';
import { CreateKingdomMessageDto } from 'src/modules/kingdomMessages/dto/create-kingdomMessage.dto';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from 'src/modules/auth/guards/ws-auth.guard';
import { UserEntity } from 'src/modules/users/user.entity';

@WebSocketGateway(3030)
export class KingdomChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private kingdomChatService: KingdomChatService,
    private kingdomMessageService: KingdomMessagesService,
  ) {}

  async handleConnection(socket, metaData) {
    await this.kingdomChatService.getUserFromSocket(socket, metaData);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('send_message')
  async listenForMessages(
    @MessageBody('user') user: UserEntity,
    @MessageBody('kingdomMessage')
    kingdomMessagePayload: CreateKingdomMessageDto,
  ) {
    const message = await this.kingdomMessageService.create(
      kingdomMessagePayload,
    );

    const event = 'new_message_in_kingdom';
    const broadCastMessage = JSON.stringify({
      event,
      kingdomId: message.kingdomId,
      data: message,
    });

    this.server.clients.forEach((client) => {
      client.send(broadCastMessage);
    });
  }

  // @UseGuards(WsJwtGuard)
  // @SubscribeMessage('get_all_messages')
  // async getAllMessages(@ConnectedSocket() socket, @MessageBody() body) {
  //   const { kingdomId, take, skip } = body;
  //   if (!kingdomId) {
  //     throw new WsException('kingdomId is not provided in request body');
  //   }
  //   const messages = await this.kingdomMessageService.findAllBy({
  //     kingdomId: body.kingdomId,
  //     take,
  //     skip,
  //   });

  //   return { event: 'receive_all_messages_on_kingdom', data: messages };
  // }
}

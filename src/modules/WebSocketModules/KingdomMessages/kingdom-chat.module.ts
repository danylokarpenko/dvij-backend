import { Module } from '@nestjs/common';
import { KingdomChatGateway } from './kingdom-chat.gateway';
import { KingdomChatService } from './kingdom-chat.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/user.entity';
import { UserFriendsEntity } from 'src/modules/userFriends/userFriends.entity';
import { KingdomsService } from 'src/modules/kingdoms/kingdoms.service';
import { TraitsService } from 'src/modules/traits/traits.service';
import { JwtService } from '@nestjs/jwt';
import { KingdomEntity } from 'src/modules/kingdoms/kingdom.entity';
import { TraitEntity } from 'src/modules/traits/trait.entity';
import { KingdomMessagesService } from 'src/modules/kingdomMessages/kingdomMessages.service';
import { KingdomMessageEntity } from 'src/modules/kingdomMessages/kingdomMessage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserFriendsEntity,
      KingdomEntity,
      TraitEntity,
      KingdomMessageEntity,
    ]),
  ],
  providers: [
    KingdomChatGateway,
    UsersService,
    KingdomChatService,
    AuthService,
    KingdomsService,
    TraitsService,
    KingdomMessagesService,
    JwtService,
  ],
})
export class KingdomChatGatewayModule {}

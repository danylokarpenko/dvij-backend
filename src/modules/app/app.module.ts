import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: +process.env.TYPEORM_DATABASE_PORT,
      username: 'postgres',
      password: 'postgres',
      database: 'dvij',
      entities: [UserEntity],
      migrations: ['dist/migrations/*.js'], // Path to your migrations directory
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

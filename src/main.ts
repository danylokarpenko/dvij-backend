import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import AppDataSource from '../app-data-source';
import { WsAdapter } from './infrastructure/adapters/ws-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));

  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
  // Create a Swagger document options object
  const options = new DocumentBuilder()
    .setTitle('DVIJ API endpoints')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('xD')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  // Create a Swagger document
  const document = SwaggerModule.createDocument(app, options);

  // Serve the Swagger document at /api
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

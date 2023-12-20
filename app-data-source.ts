import 'dotenv/config';
import { DataSource } from 'typeorm';
// eslint-disable-next-line
const fs = require('fs');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_DATABASE_HOST,
  port: +process.env.TYPEORM_DATABASE_PORT,
  username: process.env.TYPEORM_DATABASE_USERNAME,
  password: process.env.TYPEORM_DATABASE_PASSWORD,
  database: process.env.TYPEORM_DATABASE_NAME,
  entities: ['dist/src/modules/**/*.entity{.js,.ts}'],
  migrations: ['dist/src/migrations/*{.js,.ts}'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          ca: fs.readFileSync(`/home/ec2-user/eu-west-3-bundle.pem`).toString(),
        }
      : false,
});

export default AppDataSource;

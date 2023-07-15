import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'dvij',
  synchronize: false,
  entities: ['dist/src/modules/**/*.entity{.js,.ts}'],
  migrations: ['dist/src/migrations/*{.js,.ts}'],
  migrationsRun: true,
  logging: true,
});

export default AppDataSource;

import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'dvij',
  synchronize: false,
  entities: ['dist/src/modules/**/*{.js,.ts}'],
  migrations: ['dist/src/migrations/**/*{.js,.ts}'],
});

export default AppDataSource;

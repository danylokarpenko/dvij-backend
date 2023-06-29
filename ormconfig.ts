/**
 * We need this config file for using typeorm CLI
 */
const path = require('node:path');

require('dotenv').config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === 'production' ? '.production' : '.local'}`,
  ),
});

module.exports = {
  type: 'postgres',
  synchronize: false,
  host: process.env.TYPEORM_DATABASE_HOST,
  port: process.env.TYPEORM_DATABASE_PORT,
  username: process.env.TYPEORM_DATABASE_USERNAME,
  database: process.env.TYPEORM_DATABASE_NAME,
  password: process.env.TYPEORM_DATABASE_PASSWORD,
  entities: ['dist/src/modules/**/*{.js,.ts}'],
  migrations: ['dist/src/migrations/**/*{.js,.ts}'],
  migrationsRun: true,
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
};

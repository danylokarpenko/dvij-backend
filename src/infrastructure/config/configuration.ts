import { getOsPath, getOsEnvVar } from '../utils/env.util';

export const configuration = () => ({
  port: process.env.PORT || 3030,
  host: process.env.HOST || '127.0.0.1',
  appLink: getOsEnvVar('APP_LINK'), // link to current server
  auth: {
    employee: {
      accessTokenSecret: getOsEnvVar('EMPLOYEE_ACCESS_TOKEN_SECRET'),
      refreshTokenSecret: getOsEnvVar('EMPLOYEE_REFRESH_TOKEN_SECRET'),
      accessTokenExpiresIn: parseInt(
        getOsEnvVar('EMPLOYEE_ACCESS_TOKEN_EXPIRES_IN'),
        10,
      ),
      refreshTokenExpiresIn: parseInt(
        getOsEnvVar('EMPLOYEE_REFRESH_TOKEN_EXPIRES_IN'),
        10,
      ),
    },
    backOffice: {
      accessTokenSecret: getOsEnvVar('BACK_OFFICE_ACCESS_TOKEN_SECRET'),
      refreshTokenSecret: getOsEnvVar('BACK_OFFICE_REFRESH_TOKEN_SECRET'),
      accessTokenExpiresIn: parseInt(
        getOsEnvVar('BACK_OFFICE_ACCESS_TOKEN_EXPIRES_IN'),
        10,
      ),
      refreshTokenExpiresIn: parseInt(
        getOsEnvVar('BACK_OFFICE_REFRESH_TOKEN_EXPIRES_IN'),
        10,
      ),
    },
  },
  JWT_SECRET: getOsEnvVar('JWT_SECRET'),
  externalLinks: {
    employeeActivationAppLink: getOsEnvVar('EMPLOYEE_ACTIVATION_APP_LINK'), // link to employee mobile application
  },
  database: {
    host: getOsEnvVar('TYPEORM_DATABASE_HOST'),
    port: getOsEnvVar('TYPEORM_DATABASE_PORT'),
    username: getOsEnvVar('TYPEORM_DATABASE_USERNAME'),
    database: getOsEnvVar('TYPEORM_DATABASE_NAME'),
    password: getOsEnvVar('TYPEORM_DATABASE_PASSWORD'),
    entities: getOsPath(getOsEnvVar('TYPEORM_ENTITIES')),
    migrations: getOsPath(getOsEnvVar('TYPEORM_MIGRATIONS')),
    migrationsDir: getOsPath(getOsEnvVar('TYPEORM_MIGRATIONS_DIR')),
  },
});

import { getOsPath, getOsEnvVar } from '../utils/env.util';

export const configuration = () => ({
  port: process.env.PORT || 3000,
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
  sendGrid: {
    apiKey: getOsEnvVar('SEND_GRID_KEY'),
    fromEmail: getOsEnvVar('SEND_GRID_FROM_EMAIL'),
    accountActivationTemplateId: getOsEnvVar(
      'SEND_GRID_ACCOUNT_ACTIVATION_TEMPLATE_ID',
    ),
  },
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

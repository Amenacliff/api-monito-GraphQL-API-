/* eslint-disable */
namespace NodeJS {
  interface ProcessEnv {
    POSTGRESQL_PORT: string;
    POSTGRESQL_DBNAME: string;
    POSTGRESQL_USER_NAME: string;
    JWT_SIGNING_KEY: string;
    PRODUCTION: string;
  }
}

import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import * as process from 'process';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST_MYSQL,
  port: Number(process.env.DB_PORT_MYSQL) || 3306,
  database: process.env.DB_NAME_MYSQL,
  username: process.env.DB_USERNAME_MYSQL,
  password: process.env.DB_PASSWORD_MYSQL,
  entities: [join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'database/migrations', '*.{ts,js}')],
  synchronize: process.env.ENVIRONMENT === 'DEV',
  retryAttempts: 3,
  logging: true,
};

const dataSource = new DataSource(typeOrmConfig as DataSourceOptions);
export default dataSource;

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => typeOrmConfig,
};
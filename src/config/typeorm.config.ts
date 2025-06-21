import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { EnvironmentVariables } from './env.validation';

export const getDatabaseConfig = (
  configService: ConfigService<EnvironmentVariables>,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: +configService.get('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'postgres'),
  database: configService.get('DB_DATABASE', 'postgres'),
  entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '/../migrations/*{.ts,.js}')],
});

config();

const configService = new ConfigService<EnvironmentVariables>();

export default new DataSource(
  getDatabaseConfig(configService) as DataSourceOptions,
);

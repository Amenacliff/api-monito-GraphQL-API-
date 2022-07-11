import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const TypeOrmConfig = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: 'localhost',
    port: Number(config.get('POSTGRESQL_PORT')),
    username: config.get('POSTGRESQL_USER_NAME'),
    password: '',
    database: config.get('POSTGRESQL_DBNAME'),
    entities: [],
    synchronize: true,
  }),
});

const configModuleConfig = ConfigModule.forRoot({
  isGlobal: true,
});

@Module({
  imports: [UsersModule, configModuleConfig, TypeOrmConfig],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

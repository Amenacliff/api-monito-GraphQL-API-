import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { User } from "./users/entity/user.entity";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { ProjectService } from "./project/project.service";
import { ProjectModule } from "./project/project.module";
import { EndpointsModule } from "./endpoints/endpoints.module";
import { Project } from "./project/entity/project.entity";
import { EndpointsService } from "./endpoints/endpoints.service";

const TypeOrmConfig = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: "postgres",
    host: "localhost",
    port: Number(config.get("POSTGRESQL_PORT")),
    username: config.get("POSTGRESQL_USER_NAME"),
    password: "",
    database: config.get("POSTGRESQL_DBNAME"),
    entities: [User, Project],
    synchronize: true,
  }),
});

const configModuleConfig = ConfigModule.forRoot({
  isGlobal: true,
});

const GraphQLConfig = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), "/src/schema.gql"),
  context: ({ req, res }) => ({ req, res }),
  cors: {
    credentials: true,
    origin: true,
  },
});

@Module({
  imports: [UsersModule, configModuleConfig, TypeOrmConfig, GraphQLConfig, ProjectModule, EndpointsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

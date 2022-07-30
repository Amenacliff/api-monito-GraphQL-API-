import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectService } from "../project/project.service";
import { JwtUtils } from "src/utils/jwt.util";
import { User } from "./entity/user.entity";
import { UserResolver } from "./user.resolver";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Project } from "src/project/entity/project.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Project])],
  controllers: [UsersController],
  providers: [UsersService, UserResolver, JwtUtils, ProjectService],
})
export class UsersModule {}

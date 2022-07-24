import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entity/user.entity";
import { UsersService } from "src/users/users.service";
import { JwtUtils } from "src/utils/jwt.util";
import { Project } from "./entity/project.entity";
import { ProjectResolver } from "./project.resolver";
import { ProjectService } from "./project.service";

@Module({
  imports: [TypeOrmModule.forFeature([Project, User])],
  providers: [ProjectResolver, ProjectService, JwtUtils, UsersService],
})
export class ProjectModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtUtils } from "src/utils/jwt.util";
import { User } from "./entity/user.entity";
import { UserResolver } from "./user.resolver";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserResolver, JwtUtils],
})
export class UsersModule {}

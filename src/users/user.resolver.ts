import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { User } from "./entity/user.entity";
import { UsersService } from "./users.service";
import { CreateUser } from "./dto/main.dto";
import * as bcrypt from "bcrypt";

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UsersService) {}
  @Query(() => User)
  async user(@Args("hashedId") hasedId: string): Promise<User> {
    const user = await this.userService.findOneById(hasedId);
    return user;
  }

  @Mutation(() => String)
  async createUser(@Args() args: CreateUser): Promise<string> {
    const hashedPassword = await bcrypt.hash(args.password, 10);
    const createUserRes = await this.userService.create(hashedPassword, args.emailAddress);
    return createUserRes;
  }
}

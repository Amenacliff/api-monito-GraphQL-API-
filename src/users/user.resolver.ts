import { Args, Resolver, Query } from "@nestjs/graphql";
import { User } from "./entity/user.entity";
import { UsersService } from "./users.service";

@Resolver(of => User)
export class UserResolver {
  constructor(private userService: UsersService) {}
  @Query(returns => User)
  async user(@Args("hashedId") hasedId: string): Promise<User> {
    const user = await this.userService.findOneById(hasedId);
    return user;
  }
}

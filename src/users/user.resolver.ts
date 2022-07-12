import { Args, Resolver, Query, Mutation, Context } from "@nestjs/graphql";
import { User } from "./entity/user.entity";
import { UsersService } from "./users.service";
import { CreateUser, LoginUser } from "./dto/requests.dto";
import * as bcrypt from "bcrypt";
import { LoginUserRes } from "./dto/response.dto";
import { BCRYPT_SALT } from "src/constants/bcrypt.salt";
import { sign as signJWT } from "jsonwebtoken";
import { JWT_PAYLOAD } from "src/types/jwt";
import { Response } from "express";
import { COOKIE_TOKEN } from "src/constants/cookie";

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UsersService) {}
  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
  @Query(() => User)
  async user(@Args("hashedId") hasedId: string): Promise<User | null> {
    try {
      const user = await this.userService.findOneById(hasedId);
      return user;
    } catch (error) {
      console.log(error);
      null;
    }
  }

  @Mutation(() => String)
  async createUser(@Args() args: CreateUser): Promise<string> {
    const hashedPassword = await bcrypt.hash(args.password, BCRYPT_SALT);
    const createUserRes = await this.userService.create(hashedPassword, args.emailAddress.toLowerCase());
    return createUserRes;
  }

  @Mutation(() => LoginUserRes)
  async loginUser(@Args() args: LoginUser, @Context() context): Promise<LoginUserRes> {
    const userData = await this.userService.findOneByEmail(args.emailAddress);
    if (userData === null) {
      return {
        isLoggedIn: false,
        reason: "Invalid Password / Email ",
        userId: "",
      };
    }

    const isPassValid = await bcrypt.compare(args.password, userData.passwordHash);

    if (isPassValid == false) {
      return {
        isLoggedIn: false,
        reason: "Invalid Password / Email ",
        userId: "",
      };
    }
    const jwtPayLoad: JWT_PAYLOAD = {
      emailAddress: userData.emailAddress,
      userId: userData.hashUserId,
    };
    console.log(jwtPayLoad, process.env.JWT_SIGNING_KEY);

    const signedToken = signJWT(JSON.stringify(jwtPayLoad), process.env.JWT_SIGNING_KEY);

    const response: Response = context.res;

    response.cookie(COOKIE_TOKEN, signedToken, {
      httpOnly: true,
      secure: process.env.PRODUCTION === "true",
      maxAge: 604800000,
      sameSite: "none",
    });

    return {
      isLoggedIn: true,
      reason: "",
      userId: userData.hashUserId,
    };
  }
}

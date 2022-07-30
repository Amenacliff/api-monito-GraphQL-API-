import { Args, Resolver, Query, Mutation, Context, ResolveField, Parent } from "@nestjs/graphql";
import { User } from "./entity/user.entity";
import { UsersService } from "./users.service";
import { ChangeUserPassword, CreateUser, LoginUser } from "./dto/requests.dto";
import * as bcrypt from "bcrypt";
import { ChangeUserPasswordRes, LoginUserRes } from "./dto/response.dto";
import { BCRYPT_SALT } from "src/constants/bcrypt.salt";
import { JWT_PAYLOAD } from "src/types/jwt";
import e, { Response, Request } from "express";
import { COOKIE_TOKEN } from "src/constants/cookie";
import { JwtUtils } from "src/utils/jwt.util";
import { Project } from "src/project/entity/project.entity";
import { ProjectService } from "src/project/project.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UsersService, private jwtUtil: JwtUtils, private projectService: ProjectService) {}
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
  @ResolveField(() => [Project])
  async projects(@Parent() user: User): Promise<Project[]> {
    const projectIds = user.projects;
    const getProjectOperations = projectIds.map(eachId => {
      return this.projectService.findById(eachId);
    });
    try {
      return await Promise.all(getProjectOperations);
    } catch (error) {
      console.log(error);
      return [];
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

    const signedToken = this.jwtUtil.signJWTToken(jwtPayLoad, "7d", process.env.JWT_SIGNING_KEY);

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

  @Mutation(() => ChangeUserPasswordRes)
  async changePassword(@Args() args: ChangeUserPassword, @Context() context): Promise<ChangeUserPasswordRes> {
    const request: Request = context.req;
    const cookie = request.cookies[COOKIE_TOKEN];
    if (cookie === undefined) {
      return {
        isPasswordChanged: false,
        reason: "Unauthorized Access",
      };
    }

    const isCookieValid = this.jwtUtil.verifyJwtToken(cookie, process.env.JWT_SIGNING_KEY);
    if (isCookieValid == false) {
      return {
        isPasswordChanged: false,
        reason: "Unauthorized Access",
      };
    }

    const userCookieData = this.jwtUtil.parseJwt<JWT_PAYLOAD>(cookie);
    console.log(userCookieData);
    if (userCookieData === null) {
      return {
        isPasswordChanged: false,
        reason: "Unauthorized Access",
      };
    }

    const newPasswordHash = await bcrypt.hash(args.newPassword, BCRYPT_SALT);
    const isPasswordSaved = await this.userService.setUserPassword(newPasswordHash, userCookieData.userId);
    if (isPasswordSaved === false) {
      return {
        isPasswordChanged: false,
        reason: "An Error Occured while Updating Password",
      };
    }

    return {
      isPasswordChanged: true,
      reason: "",
    };
  }
}

import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { Request } from "express";
import { COOKIE_TOKEN } from "src/constants/cookie";
import { JWT_PAYLOAD } from "src/types/jwt";
import { JwtUtils } from "src/utils/jwt.util";
import { CreateProjectReq } from "./dto/request.dto";
import { CreateProjectRes } from "./dto/response.dto";
import { Project } from "./entity/project.entity";
import { ProjectService } from "./project.service";

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private projectService: ProjectService, private jwtUtils: JwtUtils) {}

  @Mutation(() => CreateProjectRes)
  async createProject(@Args() args: CreateProjectReq, @Context() context): Promise<CreateProjectRes> {
    const request: Request = context.req;
    const cookie = request.cookies(COOKIE_TOKEN);
    if (!cookie) {
      return {
        created: false,
        reason: "Unuathorized Access",
        projectId: "",
      };
    }

    const isJWTValid = this.jwtUtils.verifyJwtToken(cookie, process.env.JWT_SIGNING_KEY);

    if (isJWTValid == false) {
      return {
        created: false,
        reason: "Unuathorized Access",
        projectId: "",
      };
    }

    const jwtData = this.jwtUtils.parseJwt<JWT_PAYLOAD>(cookie);

    if (jwtData == null) {
      return {
        created: false,
        reason: "Unuathorized Access",
        projectId: "",
      };
    }

    try {
      const projectDetails = this.projectService.create(args.name, args.endpoint, jwtData.userId);
      if (projectDetails[0] == false) {
        return {
          created: false,
          reason: "Unable to create project",
          projectId: "",
        };
      }

      return {
        created: true,
        projectId: projectDetails[1],
        reason: "",
      };
    } catch (error) {
      console.log(error);
      return {
        created: false,
        reason: "An Error Occurred ",
        projectId: "",
      };
    }
  }
}

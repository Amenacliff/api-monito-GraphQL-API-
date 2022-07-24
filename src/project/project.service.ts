import { Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Project } from "./entity/project.entity";

import { v4 as uniqueId } from "uuid";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private dataSource: DataSource,
    private userService: UsersService,
  ) {}

  async create(projectName: string, endPoint: string, userId: string): Promise<[boolean, string]> {
    const newProjectId = uniqueId();
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.insert(Project, {
        apiUrl: endPoint,
        endPoints: [],
        projectId: newProjectId,
        projectName: projectName,
        projectScore: {
          performace: 0,
          security: 0,
          quality: 0,
          total: 0,
          performanceStats: {
            gZipSupport: 0,
            http2Support: 0,
            loadTime: 0,
            responseSize: 0,
          },
          qualityStats: {
            jsonResponse: 0,
            problems: 0,
            versionSupport: 0,
          },
          securityStats: {
            authentication: 0,
            httpSupport: 0,
          },
        },
        teamMembers: [],
      });

      const user = await this.userService.findOneById(userId);
      const currentProjects = user.projects;
      currentProjects.push(newProjectId);
      await queryRunner.manager.update(User, { hashUserId: userId }, { projects: currentProjects });
      await queryRunner.commitTransaction();
      return [true, newProjectId];
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      return [false, ""];
    }
  }
}

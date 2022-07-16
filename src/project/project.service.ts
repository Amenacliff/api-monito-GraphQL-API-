import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Project } from "./entity/project.entity";

import { v4 as uniqueId } from "uuid";

@Injectable()
export class ProjectService {
  constructor(
    @Inject(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(projectName: string, endPoint: string): Promise<[boolean, string]> {
    const newProjectId = uniqueId();
    try {
      await this.projectRepository.insert({
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
      return [true, newProjectId];
    } catch (error) {
      console.log(error);
      return [false, ""];
    }
  }
}

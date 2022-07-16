import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entity/project.entity";
import { ProjectResolver } from "./project.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectResolver],
})
export class ProjectModule {}

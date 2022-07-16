import { Int } from "@nestjs/graphql";
import { Field } from "graphql-composer-decorators";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProjectScore } from "../types/project.types";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  @Field(Int)
  id: number;
  @Column()
  projectId: string;
  @Column()
  projectName: string;
  @Column()
  apiUrl: string;
  @Column("text", { array: true })
  teamMembers: string[];
  @Column("text", { array: true })
  endPoints: string[];
  @Column("jsonb")
  projectScore: ProjectScore;
}

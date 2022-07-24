import { Int, ObjectType, Field } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProjectScore } from "../types/project.types";

@Entity()
@ObjectType({ isAbstract: true })
export class Project {
  @PrimaryGeneratedColumn()
  @Field(Int)
  id: number;
  @Column()
  @Field()
  projectId: string;
  @Column()
  @Field()
  projectName: string;
  @Column()
  @Field()
  apiUrl: string;
  @Column("text", { array: true })
  @Field(() => [String])
  teamMembers: string[];
  @Column("text", { array: true })
  @Field(() => [String])
  endPoints: string[];
  @Column("jsonb")
  @Field()
  projectScore: ProjectScore;
}

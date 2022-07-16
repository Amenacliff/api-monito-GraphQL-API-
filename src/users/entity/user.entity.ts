import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Project } from "src/project/entity/project.entity";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(Int)
  id: number;
  @Column()
  @Field()
  emailAddress: string;
  @Column("uuid")
  @Field()
  hashUserId: string;
  @Column()
  @Field()
  passwordHash: string;
  @Column("text", { array: true })
  @Field(() => [Project])
  projects: Project[];
  @Column()
  @Field()
  apiKey: string;
  @Column()
  @Field()
  timeZone: string;
  @Column("bool", { default: true })
  @Field()
  notificationTurnedOn: boolean;
}

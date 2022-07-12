import { Field, Int, ObjectType, ArrayElement } from "@nestjs/graphql";
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
  @Column()
  @Field()
  hashUserId: string;
  @Column()
  @Field()
  passwordHash: string;
  @Column("text", { array: true })
  @Field(returns => [String])
  projects: string[];
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

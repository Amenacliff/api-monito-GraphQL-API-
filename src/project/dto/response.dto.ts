import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CreateProjectRes {
  @Field()
  created: boolean;
  @Field()
  projectId: string;
  @Field()
  reason: string;
}

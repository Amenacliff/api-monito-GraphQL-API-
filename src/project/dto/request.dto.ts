import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class CreateProjectReq {
  @Field()
  name: string;
  @Field()
  endpoint: string;
}

@ArgsType()
export class DeleteProjectReq {
  @Field()
  projectId: string;
}

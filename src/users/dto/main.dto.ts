import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class Response {
  @Field()
  sucess: boolean;
  @Field()
  reason: string;
}

@ArgsType()
class CreateUser {
  @Field()
  emailAddress: string;
  @Field()
  password: string;
}

export { CreateUser, Response };

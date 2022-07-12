import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
class CreateUser {
  @Field()
  emailAddress: string;
  @Field()
  password: string;
}

@ArgsType()
class LoginUser {
  @Field()
  emailAddress: string;
  @Field()
  password: string;
}

export { CreateUser, LoginUser };

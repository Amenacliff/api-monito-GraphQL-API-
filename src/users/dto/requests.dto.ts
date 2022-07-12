import { ArgsType, Field } from "@nestjs/graphql";

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

@ArgsType()
class ChangeUserPassword {
  @Field()
  newPassword: string;
}

export { CreateUser, LoginUser, ChangeUserPassword };

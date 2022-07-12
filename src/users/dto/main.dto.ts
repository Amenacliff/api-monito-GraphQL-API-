import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
class CreateUser {
  @Field()
  emailAddress: string;
  @Field()
  password: string;
}

export { CreateUser };

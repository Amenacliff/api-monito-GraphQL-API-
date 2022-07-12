import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class LoginUserRes {
  @Field()
  userId: string;
  @Field()
  isLoggedIn: boolean;
  @Field()
  reason: string;
}

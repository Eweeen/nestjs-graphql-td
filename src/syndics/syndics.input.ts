import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SyndicInput {
  @Field(() => String)
  name: string;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PersonInput {
  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => Date)
  birthdate: Date;

  @Field(() => Number)
  owner: number;

  @Field(() => Number)
  tenant: number;
}

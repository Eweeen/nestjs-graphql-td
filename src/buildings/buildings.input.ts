import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BuildingInput {
  @Field(() => Number)
  nb_floors: number;

  @Field(() => String)
  address: string;

  @Field(() => String)
  zip: string;

  @Field(() => String)
  city: string;

  @Field(() => Number)
  syndic_id: number;
}

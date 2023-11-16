import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ApartmentInput {
  @Field(() => Number)
  nb_rooms: number;

  @Field(() => Number)
  nb_tenants_max: number;

  @Field(() => Number)
  price: number;

  @Field(() => Number)
  type_id: number;

  @Field(() => Number)
  building_id: number;

  @Field(() => Number)
  owner_id: number;

  @Field(() => Number)
  tenant_main_id: number;
}

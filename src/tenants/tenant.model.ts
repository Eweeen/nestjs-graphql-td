import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Tenant } from './tenant.entity';
import { PersonModel } from '../persons/person.model';
import { ApartmentModel } from '../apartments/apartment.model';

@ObjectType()
export class TenantModel implements PersonModel {
  constructor(tenant: Tenant) {
    this.id = tenant.id;
    this.tenant_main = tenant.tenant_main;
    this.apartment = new ApartmentModel(tenant.apartment);
    this.person = new PersonModel(tenant.person);
  }

  @Field(() => ID)
  id: number;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => Date)
  birthdate: Date;

  @Field(() => Boolean)
  tenant_main: boolean;

  @Field(() => ApartmentModel)
  apartment: ApartmentModel;

  @Field(() => PersonModel)
  person: PersonModel;
}

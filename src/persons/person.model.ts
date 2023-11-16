import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OwnerModel } from '../owners/owner.model';
import { Person } from './person.entity';
import { TenantModel } from '../tenants/tenant.model';

@ObjectType()
export class PersonModel {
  constructor(person: Person) {
    this.id = person.id;
    this.firstname = person.firstname;
    this.lastname = person.lastname;
    this.birthdate = person.birthdate;
    this.owner = new OwnerModel(person.owner);
    this.tenant = new TenantModel(person.tenant);
  }

  @Field(() => ID)
  id: number;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => Date)
  birthdate: Date;

  @Field(() => OwnerModel)
  owner?: OwnerModel;

  @Field(() => TenantModel)
  tenant?: TenantModel;
}

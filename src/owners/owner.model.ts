import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Apartment } from '../apartments/appartment.entity';
import { Owner } from './owner.entity';
import { ApartmentModel } from '../apartments/apartment.model';
import { PersonModel } from '../persons/person.model';

@ObjectType()
export class OwnerModel implements PersonModel {
  constructor(owner: Owner) {
    this.id = owner.id;
    this.account_number = owner.account_number;
    this.is_subject_to_tva = owner.is_subject_to_tva;
    this.apartments = owner.apartments?.map(
      (apartment: Apartment) => new ApartmentModel(apartment),
    );
  }

  @Field(() => ID)
  id: number;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => Date)
  birthdate: Date;

  @Field(() => Number)
  account_number: number;

  @Field(() => Boolean)
  is_subject_to_tva: boolean;

  @Field(() => [ApartmentModel])
  apartments: ApartmentModel[];

  @Field(() => PersonModel)
  person: PersonModel;
}

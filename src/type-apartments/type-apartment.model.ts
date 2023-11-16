import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Apartment } from '../apartments/appartment.entity';
import { TypeApartment } from './type-apartment.entity';
import { ApartmentModel } from '../apartments/apartment.model';

@ObjectType()
export class TypeApartmentModel {
  constructor(type_apartment: TypeApartment) {
    this.id = type_apartment.id;
    this.name = type_apartment.name;
    this.apartments = type_apartment.apartments?.map(
      (apartment: Apartment) => new ApartmentModel(apartment),
    );
  }

  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [ApartmentModel])
  apartments: ApartmentModel[];
}

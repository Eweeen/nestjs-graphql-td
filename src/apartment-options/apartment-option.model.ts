import { Field, ObjectType } from '@nestjs/graphql';
import { OptionModel } from '../options/option.model';
import { ApartmentOption } from './apartment-option.entity';
import { ApartmentModel } from '../apartments/apartment.model';

@ObjectType()
export class ApartmentOptionModel {
  constructor(apartment_option: ApartmentOption) {
    this.id_apartment = apartment_option.id_apartment;
    this.id_option = apartment_option.id_option;
    this.apartment = new ApartmentModel(apartment_option.apartment);
    this.option = new OptionModel(apartment_option.option);
  }

  @Field(() => Number)
  id_apartment: number;

  @Field(() => Number)
  id_option: number;

  @Field(() => ApartmentModel)
  apartment: ApartmentModel;

  @Field(() => OptionModel)
  option: OptionModel;
}

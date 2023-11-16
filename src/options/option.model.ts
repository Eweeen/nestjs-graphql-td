import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApartmentOption } from '../apartment-options/apartment-option.entity';
import { ApartmentOptionModel } from '../apartment-options/apartment-option.model';
import { Option } from './option.entity';

@ObjectType()
export class OptionModel {
  constructor(option: Option) {
    this.id = option.id;
    this.name = option.name;
    this.apartment_options = option.apartment_options?.map(
      (apartment_option: ApartmentOption) =>
        new ApartmentOptionModel(apartment_option),
    );
  }

  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => ApartmentOptionModel)
  apartment_options: ApartmentOptionModel[];
}

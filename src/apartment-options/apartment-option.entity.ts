import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Apartment } from '../apartments/appartment.entity';
import { Option } from '../options/option.entity';

@Entity('apartment_options')
export class ApartmentOption {
  @PrimaryColumn({ type: 'int' })
  id_apartment: number;

  @PrimaryColumn({ type: 'int' })
  id_option: number;

  @ManyToOne(
    () => Apartment,
    (apartment: Apartment) => apartment.apartment_options,
  )
  @JoinColumn({ name: 'id_apartment' })
  apartment: Apartment;

  @ManyToOne(() => Option, (option: Option) => option.apartment_options)
  @JoinColumn({ name: 'id_option' })
  option: Option;
}

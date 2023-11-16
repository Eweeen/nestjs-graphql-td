import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApartmentOption } from '../apartment-options/apartment-option.entity';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(
    () => ApartmentOption,
    (apartmentOption: ApartmentOption) => apartmentOption.option,
  )
  apartment_options: ApartmentOption[];
}

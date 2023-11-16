import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Apartment } from '../apartments/appartment.entity';

@Entity('type_apartments')
export class TypeApartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => Apartment, (apartment: Apartment) => apartment.type)
  apartments: Apartment[];
}

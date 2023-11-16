import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeApartment } from '../type-apartments/type-apartment.entity';
import { Building } from '../buildings/building.entity';
import { ApartmentOption } from '../apartment-options/apartment-option.entity';
import { Owner } from '../owners/owner.entity';
import { Tenant } from '../tenants/tenant.entity';

@Entity('apartments')
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  nb_rooms: number;

  @Column({ type: 'int' })
  nb_tenants_max: number;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => TypeApartment, (type: TypeApartment) => type.apartments)
  @JoinColumn({ name: 'type_id' })
  type: TypeApartment;

  @ManyToOne(() => Building, (building: Building) => building.apartments)
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @OneToMany(
    () => ApartmentOption,
    (apartmentOption: ApartmentOption) => apartmentOption.apartment,
  )
  apartment_options: ApartmentOption[];

  @ManyToOne(() => Owner, (owner: Owner) => owner.apartments)
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;

  @OneToMany(() => Tenant, (tenant: Tenant) => tenant.apartment)
  tenants: Tenant[];

  @OneToOne(() => Tenant, (tenant: Tenant) => tenant.apartment)
  @JoinColumn({ name: 'tenant_main_id' })
  tenant_main: Tenant;
}

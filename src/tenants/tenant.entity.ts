import { Person } from '../persons/person.entity';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Apartment } from '../apartments/appartment.entity';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean' })
  tenant_main: boolean;

  @ManyToOne(() => Apartment, (apartment: Apartment) => apartment.tenants)
  @JoinColumn({ name: 'apartment_id' })
  apartment: Apartment;

  @OneToOne(() => Person, (person: Person) => person.owner)
  person: Person;
}

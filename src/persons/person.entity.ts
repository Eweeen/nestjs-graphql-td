import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Owner } from '../owners/owner.entity';
import { Tenant } from '../tenants/tenant.entity';

@Entity('persons')
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  firstname: string;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column({ type: 'date' })
  birthdate: Date;

  @OneToOne(() => Owner, (owner: Owner) => owner.person)
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;

  @OneToOne(() => Tenant, (tenant: Tenant) => tenant.person)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;
}

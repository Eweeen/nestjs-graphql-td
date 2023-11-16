import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Syndic } from '../syndics/syndic.entity';
import { BuildingEquipment } from '../building-equipments/building-equipment.entity';
import { Apartment } from '../apartments/appartment.entity';

@Entity('buildings')
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  nb_floors: number;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar', length: 5 })
  zip: string;

  @Column({ type: 'varchar' })
  city: string;

  @OneToMany(() => Apartment, (apartment: Apartment) => apartment.building)
  apartments: Apartment[];

  @ManyToOne(() => Syndic, (syndic: Syndic) => syndic.buildings)
  @JoinColumn({ name: 'syndic_id' })
  syndic: Syndic;

  @OneToMany(
    () => BuildingEquipment,
    (building_equipment: BuildingEquipment) => building_equipment.building,
  )
  building_equipments: BuildingEquipment[];
}

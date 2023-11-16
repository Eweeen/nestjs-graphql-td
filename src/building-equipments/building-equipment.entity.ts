import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Building } from '../buildings/building.entity';
import { CommonEquipment } from '../common-equipments/common-equipment.entity';

@Entity('building_equipments')
export class BuildingEquipment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Building,
    (building: Building) => building.building_equipments,
  )
  @JoinColumn({ name: 'id_building' })
  building: Building;

  @ManyToOne(
    () => CommonEquipment,
    (equipment: CommonEquipment) => equipment.building_equipments,
  )
  @JoinColumn({ name: 'id_equipment' })
  equipment: CommonEquipment;
}

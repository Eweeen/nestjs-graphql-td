import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BuildingEquipment } from '../building-equipments/building-equipment.entity';

@Entity('common_equipments')
export class CommonEquipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(
    () => BuildingEquipment,
    (building_equipment: BuildingEquipment) => building_equipment.equipment,
  )
  building_equipments: BuildingEquipment[];
}

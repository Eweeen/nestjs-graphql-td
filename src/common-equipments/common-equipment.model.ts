import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BuildingEquipment } from '../building-equipments/building-equipment.entity';
import { CommonEquipment } from './common-equipment.entity';
import { BuildingEquipmentModel } from '../building-equipments/building-equipment.model';

@ObjectType()
export class CommonEquipmentModel {
  constructor(commonEquipment: CommonEquipment) {
    this.id = commonEquipment.id;
    this.name = commonEquipment.name;
    this.building_equipments = commonEquipment.building_equipments?.map(
      (building_equipment: BuildingEquipment) =>
        new BuildingEquipmentModel(building_equipment),
    );
  }

  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [BuildingEquipmentModel])
  building_equipments: BuildingEquipmentModel[];
}

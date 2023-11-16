import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BuildingEquipment } from './building-equipment.entity';
import { CommonEquipmentModel } from '../common-equipments/common-equipment.model';
import { BuildingModel } from '../buildings/building.model';

@ObjectType()
export class BuildingEquipmentModel {
  constructor(buildingEquipment: BuildingEquipment) {
    this.id = buildingEquipment.id;
    this.building = new BuildingModel(buildingEquipment.building);
    this.equipment = new CommonEquipmentModel(buildingEquipment.equipment);
  }

  @Field(() => ID)
  id: number;

  @Field(() => BuildingModel)
  building: BuildingModel;

  @Field(() => CommonEquipmentModel)
  equipment: CommonEquipmentModel;
}

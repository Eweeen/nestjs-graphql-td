import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BuildingEquipment } from '../building-equipments/building-equipment.entity';
import { Apartment } from '../apartments/appartment.entity';
import { SyndicModel } from '../syndics/syndic.model';
import { Building } from './building.entity';
import { ApartmentModel } from '../apartments/apartment.model';
import { BuildingEquipmentModel } from '../building-equipments/building-equipment.model';

@ObjectType()
export class BuildingModel {
  constructor(building: Building) {
    this.id = building.id;
    this.nb_floors = building.nb_floors;
    this.address = building.address;
    this.zip = building.zip;
    this.city = building.city;
    this.apartments = building.apartments?.map(
      (apartment: Apartment) => new ApartmentModel(apartment),
    );
    this.syndic = new SyndicModel(building.syndic);
    this.building_equipments = building.building_equipments?.map(
      (building_equipment: BuildingEquipment) =>
        new BuildingEquipmentModel(building_equipment),
    );
  }

  @Field(() => ID)
  id: number;

  @Field(() => Number)
  nb_floors: number;

  @Field(() => String)
  address: string;

  @Field(() => String)
  zip: string;

  @Field(() => String)
  city: string;

  @Field(() => [ApartmentModel])
  apartments: ApartmentModel[];

  @Field(() => SyndicModel)
  syndic: SyndicModel;

  @Field(() => [BuildingEquipmentModel])
  building_equipments: BuildingEquipmentModel[];
}

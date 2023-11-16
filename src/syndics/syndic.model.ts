import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Building } from '../buildings/building.entity';
import { Syndic } from './syndic.entity';
import { BuildingModel } from '../buildings/building.model';

@ObjectType()
export class SyndicModel {
  constructor(syndic: Syndic) {
    this.id = syndic.id;
    this.name = syndic.name;
    this.buildings = syndic?.buildings?.map(
      (building: Building) => new BuildingModel(building),
    );
  }

  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [BuildingModel], { nullable: true })
  buildings?: BuildingModel[];
}

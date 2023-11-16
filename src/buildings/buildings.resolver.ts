import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Building } from './building.entity';
import { BuildingsService } from './buildings.service';
import { BuildingInput } from './buildings.input';
import { Apartment } from '../apartments/appartment.entity';
import { Syndic } from '../syndics/syndic.entity';
import { BuildingEquipment } from '../building-equipments/building-equipment.entity';
import { BuildingModel } from './building.model';
import { ApartmentModel } from '../apartments/apartment.model';
import { SyndicModel } from '../syndics/syndic.model';
import { BuildingEquipmentModel } from '../building-equipments/building-equipment.model';

@Resolver(() => BuildingModel)
export class BuildingsResolver {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Query(() => BuildingModel)
  async building(@Args('id') id: number): Promise<BuildingModel> {
    const building: Building = await this.buildingsService.findOne(id);
    return new BuildingModel(building);
  }

  @Query(() => [BuildingModel])
  async buildings(): Promise<BuildingModel[]> {
    const buildings: Building[] = await this.buildingsService.findAll();
    return buildings.map((building: Building) => new BuildingModel(building));
  }

  @Mutation(() => BuildingModel)
  async createBuilding(
    @Args('buildingData') input: BuildingInput,
  ): Promise<BuildingModel> {
    const building: Building = await this.buildingsService.create(input);
    return new BuildingModel(building);
  }

  @Mutation(() => BuildingModel)
  async updateBuilding(
    @Args('id') id: number,
    @Args('buildingData') input: BuildingInput,
  ): Promise<BuildingModel> {
    const building: Building = await this.buildingsService.update(id, input);
    return new BuildingModel(building);
  }

  @ResolveField(() => [ApartmentModel])
  async apartments(
    @Parent() building: BuildingModel,
  ): Promise<ApartmentModel[]> {
    if (building.apartments) return building.apartments;
    else {
      const apartments: Apartment[] =
        await this.buildingsService.loadApartments(building.id);
      return apartments.map(
        (apartment: Apartment) => new ApartmentModel(apartment),
      );
    }
  }

  @ResolveField(() => SyndicModel)
  async syndic(@Parent() building: BuildingModel): Promise<SyndicModel> {
    if (building.syndic) return building.syndic;
    else {
      const syndic: Syndic = await this.buildingsService.loadSyndic(
        building.id,
      );
      return new SyndicModel(syndic);
    }
  }

  @ResolveField(() => [BuildingEquipmentModel])
  async building_equipments(
    @Parent() building: BuildingModel,
  ): Promise<BuildingEquipmentModel[]> {
    if (building.building_equipments) return building.building_equipments;
    else {
      const buildingEquipment: BuildingEquipment[] =
        await this.buildingsService.loadBuildingEquipments(building.id);
      return buildingEquipment.map(
        (buildingEquipment: BuildingEquipment) =>
          new BuildingEquipmentModel(buildingEquipment),
      );
    }
  }
}

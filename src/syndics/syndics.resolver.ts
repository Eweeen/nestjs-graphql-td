import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { SyndicsService } from './syndics.service';
import { SyndicInput } from './syndics.input';
import { Building } from '../buildings/building.entity';
import { Syndic } from './syndic.entity';
import { SyndicModel } from './syndic.model';
import { BuildingModel } from '../buildings/building.model';

@Resolver(() => SyndicModel)
export class SyndicsResolver {
  constructor(private readonly syndicsService: SyndicsService) {}

  @Query(() => SyndicModel)
  async syndic(@Args('id') id: number): Promise<SyndicModel> {
    const syndic: Syndic = await this.syndicsService.findOne(id);
    return new SyndicModel(syndic);
  }

  @Query(() => [SyndicModel])
  async syndics(): Promise<SyndicModel[]> {
    const syndics: Syndic[] = await this.syndicsService.findAll();
    return syndics.map((syndic: Syndic) => new SyndicModel(syndic));
  }

  @Mutation(() => SyndicModel)
  async createSyndic(
    @Args('syndicData') input: SyndicInput,
  ): Promise<SyndicModel> {
    const syndic: Syndic = await this.syndicsService.create(input);
    return new SyndicModel(syndic);
  }

  @Mutation(() => SyndicModel)
  async updateSyndic(
    @Args('id') id: number,
    @Args('syndicData') input: SyndicInput,
  ): Promise<SyndicModel> {
    const syndic: Syndic = await this.syndicsService.update(id, input);
    return new SyndicModel(syndic);
  }

  @ResolveField(() => [BuildingModel])
  async buildings(@Parent() syndic: SyndicModel): Promise<BuildingModel[]> {
    if (syndic.buildings) return syndic.buildings;
    else {
      const buildings: Building[] = await this.syndicsService.loadBuildings(
        syndic.id,
      );
      return buildings.map((building: Building) => new BuildingModel(building));
    }
  }
}

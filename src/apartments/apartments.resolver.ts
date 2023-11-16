import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Apartment } from './appartment.entity';
import { ApartmentsService } from './apartments.service';
import { ApartmentInput } from './apartments.input';
import { TypeApartment } from '../type-apartments/type-apartment.entity';
import { Building } from '../buildings/building.entity';
import { ApartmentOption } from '../apartment-options/apartment-option.entity';
import { Owner } from '../owners/owner.entity';
import { Tenant } from '../tenants/tenant.entity';
import { ApartmentModel } from './apartment.model';
import { TypeApartmentModel } from '../type-apartments/type-apartment.model';
import { BuildingModel } from '../buildings/building.model';
import { ApartmentOptionModel } from '../apartment-options/apartment-option.model';
import { OwnerModel } from '../owners/owner.model';
import { TenantModel } from '../tenants/tenant.model';

@Resolver(() => ApartmentModel)
export class ApartmentsResolver {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Query(() => ApartmentModel)
  async apartment(@Args('id') id: number): Promise<ApartmentModel> {
    const apartment: Apartment = await this.apartmentsService.findOne(id);
    return new ApartmentModel(apartment);
  }

  @Query(() => [ApartmentModel])
  async apartments(): Promise<ApartmentModel[]> {
    const apartments: Apartment[] = await this.apartmentsService.findAll();
    return apartments.map(
      (apartment: Apartment) => new ApartmentModel(apartment),
    );
  }

  @Mutation(() => ApartmentModel)
  async createApartment(
    @Args('apartmentData') input: ApartmentInput,
  ): Promise<ApartmentModel> {
    const apartment: Apartment = await this.apartmentsService.create(input);
    return new ApartmentModel(apartment);
  }

  @Mutation(() => ApartmentModel)
  async updateApartment(
    @Args('id') id: number,
    @Args('apartmentData') input: ApartmentInput,
  ): Promise<ApartmentModel> {
    const apartment: Apartment = await this.apartmentsService.update(id, input);
    return new ApartmentModel(apartment);
  }

  @ResolveField(() => TypeApartmentModel)
  async type(@Parent() apartment: ApartmentModel): Promise<TypeApartmentModel> {
    if (apartment.type) return apartment.type;
    else {
      const typeApartment: TypeApartment =
        await this.apartmentsService.loadType(apartment.id);
      return new TypeApartmentModel(typeApartment);
    }
  }

  @ResolveField(() => BuildingModel)
  async building(@Parent() apartment: ApartmentModel): Promise<BuildingModel> {
    if (apartment.building) return apartment.building;
    else {
      const building: Building = await this.apartmentsService.loadBuilding(
        apartment.id,
      );
      return new BuildingModel(building);
    }
  }

  @ResolveField(() => [ApartmentOptionModel])
  async apartment_options(
    @Parent() apartment: ApartmentModel,
  ): Promise<ApartmentOptionModel[]> {
    if (apartment.apartment_options) return apartment.apartment_options;
    else {
      const apartmentOptions: ApartmentOption[] =
        await this.apartmentsService.loadApartmentOptions(apartment.id);
      return apartmentOptions.map(
        (apartmentOption: ApartmentOption) =>
          new ApartmentOptionModel(apartmentOption),
      );
    }
  }

  @ResolveField(() => OwnerModel)
  async owner(@Parent() apartment: ApartmentModel): Promise<OwnerModel> {
    if (apartment.owner) return apartment.owner;
    else {
      const owner: Owner = await this.apartmentsService.loadOwner(apartment.id);
      return new OwnerModel(owner);
    }
  }

  @ResolveField(() => [TenantModel])
  async tenants(@Parent() apartment: ApartmentModel): Promise<TenantModel[]> {
    if (apartment.tenants) return apartment.tenants;
    else {
      const tenants: Tenant[] = await this.apartmentsService.loadTenants(
        apartment.id,
      );
      return tenants.map((tenant: Tenant) => new TenantModel(tenant));
    }
  }

  @ResolveField(() => TenantModel)
  async tenantMain(@Parent() apartment: ApartmentModel): Promise<TenantModel> {
    if (apartment.tenant_main) return apartment.tenant_main;
    else {
      const tenant: Tenant = await this.apartmentsService.loadTenantMain(
        apartment.id,
      );
      return new TenantModel(tenant);
    }
  }
}

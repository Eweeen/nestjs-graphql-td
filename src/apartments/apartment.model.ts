import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApartmentOption } from '../apartment-options/apartment-option.entity';
import { Tenant } from '../tenants/tenant.entity';
import { BuildingModel } from '../buildings/building.model';
import { Apartment } from './appartment.entity';
import { TypeApartmentModel } from '../type-apartments/type-apartment.model';
import { ApartmentOptionModel } from '../apartment-options/apartment-option.model';
import { TenantModel } from '../tenants/tenant.model';
import { OwnerModel } from '../owners/owner.model';

@ObjectType()
export class ApartmentModel {
  constructor(apartment: Apartment) {
    this.id = apartment.id;
    this.nb_rooms = apartment.nb_rooms;
    this.nb_tenants_max = apartment.nb_tenants_max;
    this.price = apartment.price;
    this.type = new TypeApartmentModel(apartment.type);
    this.building = new BuildingModel(apartment.building);
    this.apartment_options = apartment.apartment_options?.map(
      (apartment_option: ApartmentOption) =>
        new ApartmentOptionModel(apartment_option),
    );
    this.owner = new OwnerModel(apartment.owner);
    this.tenants = apartment.tenants?.map(
      (tenant: Tenant) => new TenantModel(tenant),
    );
    this.tenant_main = new TenantModel(apartment.tenant_main);
  }

  @Field(() => ID)
  id: number;

  @Field(() => Number)
  nb_rooms: number;

  @Field(() => Number)
  nb_tenants_max: number;

  @Field(() => Number)
  price: number;

  @Field(() => TypeApartmentModel)
  type: TypeApartmentModel;

  @Field(() => BuildingModel)
  building: BuildingModel;

  @Field(() => [ApartmentOptionModel])
  apartment_options: ApartmentOptionModel[];

  @Field(() => OwnerModel)
  owner: OwnerModel;

  @Field(() => [TenantModel])
  tenants: TenantModel[];

  @Field(() => TenantModel)
  tenant_main: TenantModel;
}

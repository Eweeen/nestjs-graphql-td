import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Apartment } from './appartment.entity';
import { ApartmentInput } from './apartments.input';
import { TypeApartment } from '../type-apartments/type-apartment.entity';
import { Building } from '../buildings/building.entity';
import { ApartmentOption } from '../apartment-options/apartment-option.entity';
import { Owner } from '../owners/owner.entity';
import { Tenant } from '../tenants/tenant.entity';

@Injectable()
export class ApartmentsService {
  constructor(private dataSource: DataSource) {}

  apartmentsRepository(): Repository<Apartment> {
    return this.dataSource.getRepository(Apartment);
  }

  async create(input: ApartmentInput): Promise<Apartment> {
    return await this.apartmentsRepository().save({
      nb_rooms: input.nb_rooms,
      nb_tenants_max: input.nb_tenants_max,
      price: input.price,
      type_id: { id: input.type_id },
      building_id: { id: input.building_id },
      owner_id: { id: input.owner_id },
    });
  }

  async update(id: number, input: ApartmentInput): Promise<Apartment> {
    return await this.apartmentsRepository().save({
      id,
      nb_rooms: input.nb_rooms,
      nb_tenants_max: input.nb_tenants_max,
      price: input.price,
      type_id: { id: input.type_id },
      building_id: { id: input.building_id },
      owner_id: { id: input.owner_id },
    });
  }

  async findOne(id: number, relations?: string[]): Promise<Apartment> {
    return await this.apartmentsRepository().findOne({
      where: { id },
      relations,
    });
  }

  async findAll(relations?: string[]): Promise<Apartment[]> {
    return await this.apartmentsRepository().find({
      relations,
    });
  }

  async loadType(id: number): Promise<TypeApartment | null> {
    const apartment: Apartment = await this.apartmentsRepository().findOne({
      where: { id },
      relations: ['type'],
    });
    return apartment.type ?? null;
  }

  async loadBuilding(id: number): Promise<Building | null> {
    const apartment: Apartment = await this.apartmentsRepository().findOne({
      where: { id },
      relations: ['building'],
    });
    return apartment.building ?? null;
  }

  async loadApartmentOptions(id: number): Promise<ApartmentOption[]> {
    const apartment: Apartment = await this.apartmentsRepository().findOne({
      where: { id },
      relations: ['apartment_options.option'],
    });
    return apartment.apartment_options ?? [];
  }

  async loadOwner(id: number): Promise<Owner | null> {
    const apartment: Apartment = await this.apartmentsRepository().findOne({
      where: { id },
      relations: ['owner'],
    });
    return apartment.owner ?? null;
  }

  async loadTenants(id: number): Promise<Tenant[]> {
    const apartment: Apartment = await this.apartmentsRepository().findOne({
      where: { id },
      relations: ['tenants'],
    });
    return apartment.tenants ?? [];
  }

  async loadTenantMain(id: number): Promise<Tenant | null> {
    const apartment: Apartment = await this.apartmentsRepository().findOne({
      where: { id },
      relations: ['tenants'],
    });
    return apartment.tenant_main ?? null;
  }
}

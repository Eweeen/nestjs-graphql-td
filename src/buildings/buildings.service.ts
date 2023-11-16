import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Building } from './building.entity';
import { BuildingInput } from './buildings.input';
import { Apartment } from '../apartments/appartment.entity';
import { Syndic } from '../syndics/syndic.entity';
import { BuildingEquipment } from '../building-equipments/building-equipment.entity';

@Injectable()
export class BuildingsService {
  constructor(private dataSource: DataSource) {}

  buildingsRepository(): Repository<Building> {
    return this.dataSource.getRepository(Building);
  }

  async create(input: BuildingInput): Promise<Building> {
    return await this.buildingsRepository().save({
      nb_floors: input.nb_floors,
      address: input.address,
      zip: input.zip,
      city: input.city,
      syndic: { id: input.syndic_id },
    });
  }

  async update(id: number, input: BuildingInput): Promise<Building> {
    return await this.buildingsRepository().save({
      id,
      nb_floors: input.nb_floors,
      address: input.address,
      zip: input.zip,
      city: input.city,
      syndic: { id: input.syndic_id },
    });
  }

  async findOne(id: number, relations?: string[]): Promise<Building> {
    return await this.buildingsRepository().findOne({
      where: { id },
      relations,
    });
  }

  async findAll(): Promise<Building[]> {
    return await this.buildingsRepository().find();
  }

  async loadApartments(id: number): Promise<Apartment[]> {
    const building: Building = await this.buildingsRepository().findOne({
      where: { id },
      relations: ['apartments'],
    });
    return building.apartments;
  }

  async loadSyndic(id: number): Promise<Syndic | null> {
    const building: Building = await this.buildingsRepository().findOne({
      where: { id },
      relations: ['syndic'],
    });
    return building.syndic ?? null;
  }

  async loadBuildingEquipments(id: number): Promise<BuildingEquipment[]> {
    const building: Building = await this.buildingsRepository().findOne({
      where: { id },
      relations: ['building_equipments.equipment'],
    });
    return building.building_equipments;
  }
}

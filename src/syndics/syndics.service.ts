import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Syndic } from './syndic.entity';
import { SyndicInput } from './syndics.input';
import { Building } from '../buildings/building.entity';
import { SyndicModel } from './syndic.model';

@Injectable()
export class SyndicsService {
  constructor(private dataSource: DataSource) {}

  syndicsRepository(): Repository<Syndic> {
    return this.dataSource.getRepository(Syndic);
  }

  async create(input: SyndicInput): Promise<Syndic> {
    return await this.syndicsRepository().save({
      name: input.name,
    });
  }

  async update(id: number, input: SyndicInput): Promise<Syndic> {
    return await this.syndicsRepository().save({
      id,
      name: input.name,
    });
  }

  async findOne(id: number, relations?: string[]): Promise<Syndic> {
    return await this.syndicsRepository().findOne({
      where: { id },
      relations,
    });
  }

  async findAll(): Promise<Syndic[]> {
    return await this.syndicsRepository().find();
  }

  async loadBuildings(id: number): Promise<Building[]> {
    const syndic: Syndic = await this.syndicsRepository().findOne({
      where: { id },
      relations: ['buildings'],
    });
    return syndic.buildings ?? [];
  }
}

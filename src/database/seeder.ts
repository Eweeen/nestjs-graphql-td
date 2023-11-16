import { DataSource, EntityTarget } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { CommonEquipment } from '../common-equipments/common-equipment.entity';
import { seedCommonEquipments } from './data-fixtures/common-equipments';
import { seedTypeApartments } from './data-fixtures/type-apartments';
import { TypeApartment } from '../type-apartments/type-apartment.entity';
import { seedOptions } from './data-fixtures/options';
import { Option } from '../options/option.entity';

@Injectable()
export class SeederCommand {
  constructor(private dataSource: DataSource) {}

  getRepository = (repository: EntityTarget<any>) => {
    return this.dataSource.getRepository(repository);
  };

  @Command({ command: 'seed', describe: 'Seeds the database' })
  async seed(): Promise<void> {
    try {
      await seedCommonEquipments(this.getRepository(CommonEquipment));
      await seedTypeApartments(this.getRepository(TypeApartment));
      await seedOptions(this.getRepository(Option));
    } catch (error) {
      console.error(error);
    }
  }
}

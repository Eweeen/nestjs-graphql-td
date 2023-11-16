import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Person } from './person.entity';

@Injectable()
export class PersonsService {
  constructor(private dataSource: DataSource) {}

  personsRepository(): Repository<Person> {
    return this.dataSource.getRepository(Person);
  }

  async findOne(id: number): Promise<Person> {
    return await this.personsRepository().findOne({
      where: { id },
    });
  }

  async findAll(): Promise<Person[]> {
    return await this.personsRepository().find();
  }
}

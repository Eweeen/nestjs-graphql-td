import { Args, Query, Resolver } from '@nestjs/graphql';
import { PersonsService } from './persons.service';
import { Person } from './person.entity';
import { PersonModel } from './person.model';

@Resolver(() => PersonModel)
export class PersonsResolver {
  constructor(private readonly personsService: PersonsService) {}

  @Query(() => PersonModel)
  async person(@Args('id') id: number): Promise<PersonModel> {
    const person: Person = await this.personsService.findOne(id);
    return new PersonModel(person);
  }

  @Query(() => [PersonModel])
  async persons(): Promise<PersonModel[]> {
    const persons: Person[] = await this.personsService.findAll();
    return persons.map((person: Person) => new PersonModel(person));
  }
}

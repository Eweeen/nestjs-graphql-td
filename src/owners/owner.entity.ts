import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from '../persons/person.entity';
import { Apartment } from '../apartments/appartment.entity';

@ObjectType()
@Entity('owners')
export class Owner {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @Column({ type: 'int' })
  account_number: number;

  @Field(() => Boolean)
  @Column({ type: 'boolean' })
  is_subject_to_tva: boolean;

  @Field(() => [Apartment])
  @OneToMany(() => Apartment, (apartment: Apartment) => apartment.owner)
  apartments: Apartment[];

  @Field(() => Person)
  @OneToOne(() => Person, (person: Person) => person.owner)
  person: Person;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Building } from '../buildings/building.entity';

@Entity('syndics')
export class Syndic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => Building, (building) => building.syndic)
  buildings: Building[];
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Building } from '../buildings/building.entity';
import { Apartment } from '../apartments/appartment.entity';
import { Syndic } from '../syndics/syndic.entity';
import { CommonEquipment } from '../common-equipments/common-equipment.entity';
import { TypeApartment } from '../type-apartments/type-apartment.entity';
import { BuildingEquipment } from '../building-equipments/building-equipment.entity';
import { ApartmentOption } from '../apartment-options/apartment-option.entity';
import { Person } from '../persons/person.entity';
import { Owner } from '../owners/owner.entity';
import { Tenant } from '../tenants/tenant.entity';
import { Option } from '../options/option.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          Building,
          Apartment,
          Syndic,
          CommonEquipment,
          TypeApartment,
          Option,
          BuildingEquipment,
          ApartmentOption,
          Person,
          Owner,
          Tenant,
        ],
        subscribers: [],
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}

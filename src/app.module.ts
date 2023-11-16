import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CommandModule } from 'nestjs-command';
import { SeederCommand } from './database/seeder';
import { SyndicsModule } from './syndics/syndics.module';
import { SyndicsService } from './syndics/syndics.service';
import { PersonsModule } from './persons/persons.module';
import { PersonsService } from './persons/persons.service';
import { BuildingsModule } from './buildings/buildings.module';
import { BuildingsService } from './buildings/buildings.service';
import { ApartmentsModule } from './apartments/apartments.module';
import { ApartmentsService } from './apartments/apartments.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    DatabaseModule,
    CommandModule,
    SyndicsModule,
    PersonsModule,
    BuildingsModule,
    ApartmentsModule,
  ],
  providers: [
    AppService,
    SyndicsService,
    PersonsService,
    BuildingsService,
    ApartmentsService,
    SeederCommand,
  ],
  exports: [
    SyndicsService,
    PersonsService,
    BuildingsService,
    ApartmentsService,
  ],
  controllers: [AppController],
})
export class AppModule {}

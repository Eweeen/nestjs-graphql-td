import { Module } from '@nestjs/common';
import { ApartmentsResolver } from './apartments.resolver';
import { ApartmentsService } from './apartments.service';

@Module({
  providers: [ApartmentsResolver, ApartmentsService],
  exports: [ApartmentsService],
})
export class ApartmentsModule {}

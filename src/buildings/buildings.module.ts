import { Module } from '@nestjs/common';
import { BuildingsResolver } from './buildings.resolver';
import { BuildingsService } from './buildings.service';

@Module({
  providers: [BuildingsResolver, BuildingsService],
  exports: [BuildingsService],
})
export class BuildingsModule {}

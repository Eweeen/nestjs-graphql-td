import { Module } from '@nestjs/common';
import { SyndicsResolver } from './syndics.resolver';
import { SyndicsService } from './syndics.service';

@Module({
  providers: [SyndicsResolver, SyndicsService],
  exports: [SyndicsService],
})
export class SyndicsModule {}

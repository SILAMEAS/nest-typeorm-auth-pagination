import { Module } from '@nestjs/common';
import { GlobalStateService } from './global.service';

@Module({
  providers: [GlobalStateService],
  exports: [GlobalStateService],
})
export class GlobalStateModule {}
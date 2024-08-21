import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/role.guard';
import { GlobalStateService } from './global/global.service';
import { GlobalStateModule } from './global/global.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, AuthModule, ThrottlerModule.forRoot([
    { name: 'short', ttl: 1000, limit: 1 },
    { name: 'long', ttl: 60000, limit: 100 },
  ]), ProductModule, CategoryModule, GlobalStateModule],
  controllers: [],
  providers: [
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  ],
})
export class AppModule  {
}

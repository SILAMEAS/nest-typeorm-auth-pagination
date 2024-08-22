import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "../db/data-source";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./auth/role.guard";
import { GlobalStateModule } from "./global/global.module";
import { CategoryModule } from "./category/category.module";
import { ProductModule } from "./product/product.module";

@Module({
  imports: [GlobalStateModule,CategoryModule, UsersModule,ProductModule, AuthModule,TypeOrmModule.forRoot(dataSourceOptions),
     ThrottlerModule.forRoot([
    { name: 'short', ttl: 1000, limit: 1 },
    { name: 'long', ttl: 60000, limit: 100 },
  ])],
  controllers: [],
  providers: [
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  ]
})
export class AppModule  {
}

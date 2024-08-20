import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "../db/data-source";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, AuthModule, ThrottlerModule.forRoot([
    { name: 'short', ttl: 1000, limit: 1 },
    { name: 'long', ttl: 60000, limit: 100 },
  ])],
  controllers: [],
  providers: [],
})
export class AppModule  {
}

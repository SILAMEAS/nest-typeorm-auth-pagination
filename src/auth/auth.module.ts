import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import 'dotenv/config'
import * as process from "process";
import { GlobalStateModule } from '../global/global.module';

@Module({
  providers: [ AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECERT_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXP },
    }),
    GlobalStateModule
  ],
})
export class AuthModule {}

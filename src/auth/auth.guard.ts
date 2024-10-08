import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from "./decorator/public.decorator";
import * as process from "process";
import 'dotenv/config'
import { UsersService } from '../users/users.service';
import { GlobalStateService } from '../global/global.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector,private usersService:UsersService,
              private globalStateService:GlobalStateService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    let exp=0;
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret:process.env.ACCESS_TOKEN_SECERT_KEY,
      });
      const findUserByEmail=await this.usersService.findByEmail(payload.email);
      this.globalStateService.setUserGoble(findUserByEmail);
      exp=payload.exp;
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      if(new Date().getTime()/1000>exp){
        throw new BadRequestException("Token expired")
      }
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
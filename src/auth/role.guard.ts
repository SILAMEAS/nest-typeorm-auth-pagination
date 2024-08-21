import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Roles } from '../utils/common/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService,private readonly usersService:UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles =await this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      return false;
    }

    const user =await this.jwtService.verify(token);
    const fullUser=await this.usersService.findById(user.id)
    return requiredRoles.some((role) => fullUser.roles?.includes(<Roles>role));
  }
}

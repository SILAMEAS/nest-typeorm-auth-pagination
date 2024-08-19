import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isArray } from 'class-validator';
import { verify } from 'jsonwebtoken';
import * as process from 'process';
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
declare global{
  namespace Express{
    interface Request{
      currentUser?:UserEntity;
    }
  }
}

@Injectable()
export class CurrentUserMiddleWare implements NestMiddleware {
  constructor(private readonly usersService:UsersService) {
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader=req.headers.authorization|| req.headers.Authorization;
    if(!authHeader||isArray(authHeader) || !authHeader.startsWith('Bearer ')){
      req.currentUser=null;
      next();

    }else {
     try {
       const token=authHeader.split(' ')[1];
       const {id}=<JwtPayload>verify(token,process.env.ACCESS_TOKEN_SECERT_KEY)
       req.currentUser=await  this.usersService.findOne(+id)
       next();
     }catch (e){
       req.currentUser=null;
       next();

     }
    }
  }
}
interface JwtPayload{id:string}

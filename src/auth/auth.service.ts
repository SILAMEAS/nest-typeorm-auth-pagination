import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserSignupDto } from '../users/dto/user-signup.dto';
import { UserEntity } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { hash } from 'bcrypt';
import { UserSignInDto } from '../users/dto/user-signIn.dto';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(private readonly usersService:UsersService) {}
  /** -----------------------------------------------  SIGN UP-------------------------------- */
  async signup(userSignupDto:UserSignupDto):Promise<UserEntity>{
    const userExit = await this.usersService.findByEmail(userSignupDto.email);
    if (userExit) throw new BadRequestException('Email is not available');
    userSignupDto.password=await hash(userSignupDto.password,10);
    return await this.usersService.create(userSignupDto);
  }
  /** -----------------------------------------------  SIGN IN -------------------------------- */
  async signIn(userLogin:UserSignInDto):Promise<UserEntity>{
    const userFound = await this.usersService.findByEmailIncludePassword(userLogin.email);
    if (!userFound) throw new BadRequestException('User not found with this email!');
    if(!await bcrypt.compare(userLogin.password,userFound.password))
      throw new BadRequestException('Invalid password!');
    return userFound;
  }
  /** -----------------------------------------------  ACCESS TOKEN  -------------------------------- */
  async accessToken(user:UserEntity):Promise<string>{
    return sign({id:user.id,email:user.email},process.env.ACCESS_TOKEN_SECERT_KEY,
      {expiresIn:process.env.ACCESS_TOKEN_EXP})

  }
}

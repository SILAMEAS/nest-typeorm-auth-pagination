import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';
import { hash } from 'bcrypt';
import { UserSignInDto } from './dto/user-signIn.dto';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import * as process from 'process';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>) {}
  /** -----------------------------------------------  SIGN UP-------------------------------- */
  async signup(userSignupDto:UserSignupDto):Promise<UserEntity>{
    const userExit = await this.findByEmail(userSignupDto.email);
    if (userExit) throw new BadRequestException('Email is not available');
    userSignupDto.password=await hash(userSignupDto.password,10);
    let user = this.userRepository.create(userSignupDto);
    user=await this.userRepository.save(user);
    delete user.password;
    return user;
  }
  /** -----------------------------------------------  SIGN IN -------------------------------- */
  async signIn(userLogin:UserSignInDto):Promise<UserEntity>{
    const userFound = await this.findByEmailIncludePassword(userLogin.email);
    if (!userFound) throw new BadRequestException('User not found with this email!');
    if(!await bcrypt.compare(userLogin.password,userFound.password))
      throw new BadRequestException('Invalid password!');
    return userFound;
  }
  /** -----------------------------------------------  FIND BY EMAIL <NO PASSWORD INCLUDE> -------------------------------- */
  async findByEmail(email:string):Promise<UserEntity>{
    return await this.userRepository.findOne({where:{ email }})
  }
  /** -----------------------------------------------  FIND BY EMAIL <PASSWORD INCLUDE> -------------------------------- */
  async findByEmailIncludePassword(email:string):Promise<UserEntity>{
    return await this.userRepository.createQueryBuilder('users').addSelect('users.password').where('users.email=:email',{email}).getOne();
  }
  /** -----------------------------------------------  ACCESS TOKEN  -------------------------------- */
  async accessToken(user:UserEntity):Promise<string>{
    return sign({id:user.id,email:user.email},process.env.ACCESS_TOKEN_SECERT_KEY,
      {expiresIn:process.env.ACCESS_TOKEN_EXP})

  }

  async findAll():Promise<Array<UserEntity>> {
    return await this.userRepository.find()??[]
  }

  async findOne(id: number):Promise<UserEntity> {
    const user=this.userRepository.findOneBy({id});
    if(!user) throw new BadRequestException("User not found with this id")
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user=await this.findOne(id);
     Object.assign(user,updateUserDto)
    return this.userRepository.save(user);
  }

  async remove(id: number):Promise<UserEntity> {
    const user=await this.findOne(id);
    return await this.userRepository.remove(user)
  }
}

import { BadRequestException, Delete, Injectable } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserSignupDto } from "./dto/user-signup.dto";
import {hash} from 'bcrypt'
import { UserSignInDto } from "./dto/user-signIn.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>) {}
  async signup(userSignupDto:UserSignupDto):Promise<UserEntity>{
    const userExit = await this.findByEmail(userSignupDto.email);
    if (userExit) throw new BadRequestException('Email is not available');
    userSignupDto.password=await hash(userSignupDto.password,10);
    let user = this.userRepository.create(userSignupDto);
    user=await this.userRepository.save(user);
    delete user.password;

    return user;
  }
  async signIn(userSignupDto:UserSignInDto):Promise<UserEntity>{
    const userExit = await this.findByEmail(userSignupDto.email);
    if (!userExit) throw new BadRequestException('User not found');
    return userExit;
  }
  async findByEmail(email:string):Promise<UserEntity>{
    return await this.userRepository.findOneBy({ email })
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

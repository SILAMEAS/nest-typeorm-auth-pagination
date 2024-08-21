import { BadRequestException, Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserSignupDto } from "./dto/user-signup.dto";
import { PageOptionsDto } from "../utils/dtos/page.option.dto";
import { PageDto } from "../utils/dto/page.dto";
import { PageMetaDto } from "../utils/dto/page.meta.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>) {}
  private queryBuilder = this.userRepository.createQueryBuilder("user");
  /** Library Pagination
   async paginate(options: IPaginationOptions): Promise<Pagination<UserEntity>> {
   const queryBuilder = this.userRepository.createQueryBuilder('users');
   queryBuilder.orderBy('users.id', 'DESC'); // Or whatever you need to do
   return paginate<UserEntity>(queryBuilder, options);
   }
   * */

  /** -----------------------------------------------  FIND BY EMAIL <NO PASSWORD INCLUDE> -------------------------------- */
  async findByEmail(email:string):Promise<UserEntity>{
    return await this.userRepository.findOne({where:{ email }})
  }
  /** -----------------------------------------------  FIND BY EMAIL <NO PASSWORD INCLUDE> -------------------------------- */
  async emailExit(email:string){
    const emailExited=await this.userRepository.findBy({email});
    if(email&&emailExited) throw new BadRequestException("Email is already used by another user")
  }
  /** -----------------------------------------------  FIND BY EMAIL <PASSWORD INCLUDE> -------------------------------- */
  async findByEmailIncludePassword(email:string):Promise<UserEntity>{
    return await this.userRepository.createQueryBuilder('users').addSelect('users.password').where('users.email=:email',{email}).getOne();
  }
  /** -----------------------------------------------  Create User -------------------------------- */
  async create(userSignupDto:UserSignupDto){
    let user = this.userRepository.create(userSignupDto);
    user = await this.userRepository.save(user);
    delete user.password;
    return user;
  }
  /** -----------------------------------------------  FIND User By Id -------------------------------- */
  async findById(id: number):Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({id});
    if(!user) throw new BadRequestException("User not found with this id")
    delete user.password;
    return user;
  }
  /** -----------------------------------------------  Update User -------------------------------- */
  async update(id: number, updateUserDto: Partial<UpdateUserDto>) {
    await this.emailExit(updateUserDto.email);
    await this.userRepository
      .createQueryBuilder()
      .update('users')
      .set(updateUserDto)
      .where("id = :id", { id: id })
      .execute()
    return await this.findById(id);
  }
  /** -----------------------------------------------  Delete User By Id -------------------------------- */
  async remove(id: number):Promise<UserEntity> {
    const user=await this.findById(id);
    return await this.userRepository.remove(user)
  }
  /** -----------------------------------------------  Find All Users -------------------------------- */
  public async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserEntity>> {
    this.queryBuilder
      .orderBy(`user.${pageOptionsDto.orderBy}`, pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await this.queryBuilder.getCount();
    const { entities } = await this.queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}

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
  /** -----------------------------------------------  FIND BY EMAIL <PASSWORD INCLUDE> -------------------------------- */
  async findByEmailIncludePassword(email:string):Promise<UserEntity>{
    return await this.userRepository.createQueryBuilder('users').addSelect('users.password').where('users.email=:email',{email}).getOne();
  }
  async create(userSignupDto:UserSignupDto){
    let user = this.userRepository.create(userSignupDto);
    user = await this.userRepository.save(user);
    delete user.password;
    return user;
  }
  async findOne(id: number):Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({id});
    if(!user) throw new BadRequestException("User not found with this id")
    delete user.password;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user=await this.findOne(id);
     Object.assign(user,updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number):Promise<UserEntity> {
    const user=await this.findOne(id);
    return await this.userRepository.remove(user)
  }

  public async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserEntity>> {
    const queryBuilder = this.userRepository.createQueryBuilder("user");

    queryBuilder
      .orderBy(`user.${pageOptionsDto.orderBy}`, pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}

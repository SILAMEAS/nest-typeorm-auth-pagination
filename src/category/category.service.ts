import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { GlobalStateService } from "../global/global.service";
import { PageOptionsDto } from "../utils/dtos/page.option.dto";
import { PageDto } from "../utils/dto/page.dto";
import { PageMetaDto } from "../utils/dto/page.meta.dto";
import { UsersService } from "../users/users.service";
import { ResponseCategoryDto } from "./dto/response-category.dto";

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity)
              private categoryEntityRepository: Repository<CategoryEntity>,
              private globalStateService: GlobalStateService,
              private usersService: UsersService) {}
  private queryBuilder = this.categoryEntityRepository.createQueryBuilder("categories");
  // ResponseCategoryDto
  async create(createCategoryDto: CreateCategoryDto):Promise<ResponseCategoryDto> {
    if(!this.globalStateService.getUserGlobal().id){
      throw new BadRequestException("createdBy can't be null")
    }
     const category=this.categoryEntityRepository.create({ ...createCategoryDto,user: this.globalStateService.getUserGlobal()});
     const {user,id,name}=await this.categoryEntityRepository.save(category);
     return  {createdById:user.id,id,name}
  }

  // findAll() {
  //   return this.categoryEntityRepository.find()
  // }
  /** -----------------------------------------------  Find All Users -------------------------------- */
  public async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CategoryEntity>> {
    this.queryBuilder
      .orderBy(`categories.${pageOptionsDto.orderBy}`, pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await this.queryBuilder.getCount();
    const { entities } = await this.queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findById(id: number):Promise<CategoryEntity> {
    const category = await this.categoryEntityRepository.findOne({where:{id}})
    if(!category){
      throw new BadRequestException("not found category with this id")
    }
    return category;
  }
  async findByUserId(userId: number, pageOptionsDto: PageOptionsDto):Promise<PageDto<CategoryEntity>> {
    const user=await this.usersService.findById(userId);
    /**
     await this.categoryEntityRepository.find({
     where: { createdBy: user},
     relations: ['createdBy'],
     });
     * */
    this.queryBuilder
      .orderBy(`categories.${pageOptionsDto.orderBy}`, pageOptionsDto.order).where({ createdBy: user})
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await this.queryBuilder.getCount();
    const { entities } = await this.queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

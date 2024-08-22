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
  async create(createCategoryDto: CreateCategoryDto):Promise<ResponseCategoryDto> {
    await this.duplicateName(createCategoryDto.name);
     const category=this.categoryEntityRepository.create({ ...createCategoryDto,user: this.globalStateService.validateUserLogin()});
     const {user,id,name}=await this.categoryEntityRepository.save(category);
     return  {createdById:user.id,id,name}
  }

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
      throw new BadRequestException("Category not found")
    }
    return category;
  }
  async duplicateName(name: string) {
    const category = await this.categoryEntityRepository.findOne({where:{name}})
    if(category){
      throw new BadRequestException("Duplicate name of category");
    }
    return true;
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

  async remove(id: number):Promise<CategoryEntity> {
    const category =await this.findById(id);
    return this.categoryEntityRepository.remove(category)
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { GlobalStateService } from '../global/global.service';
import { PageOptionsDto } from '../utils/dtos/page.option.dto';
import { PageDto } from '../utils/dto/page.dto';
import { PageMetaDto } from '../utils/dto/page.meta.dto';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity)
              private categoryEntityRepository: Repository<CategoryEntity>,
              private globalStateService: GlobalStateService,
              private usersService: UsersService) {}
  private queryBuilder = this.categoryEntityRepository.createQueryBuilder("categories");
  async create(createCategoryDto: CreateCategoryDto) {
     const category=this.categoryEntityRepository.create(createCategoryDto);
    return this.categoryEntityRepository.save(category)
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

  findOne(id: number) {
    return `This action returns a #${id} category`;
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

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RolesDecorator } from '../auth/decorator/role.key.decorator';
import { Roles } from '../utils/common/user-role.enum';
import { PageOptionsDto } from '../utils/dtos/page.option.dto';
import { PageDto } from '../utils/dto/page.dto';
import { UserEntity } from '../users/entities/user.entity';
import { CategoryEntity } from './entities/category.entity';
@ApiTags('Categories')
@ApiBearerAuth('access-token')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
@RolesDecorator(Roles.ADMIN)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query(ValidationPipe) pageOptionsDto: PageOptionsDto,):Promise<PageDto<CategoryEntity>> {
    return this.categoryService.findAll(pageOptionsDto);
  }
  @Get('/userId/:userId')
  findByUserId(@Param('userId') id: number,@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<CategoryEntity>> {
    return this.categoryService.findByUserId(+id,pageOptionsDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {  RolesDecorator } from '../auth/decorator/role.key.decorator';
import { Roles } from '../utils/common/user-role.enum';
import { PageOptionsDto } from "../utils/dtos/page.option.dto";
import { PageDto } from "../utils/dto/page.dto";
import { UserEntity } from "../users/entities/user.entity";
import { ProductEntity } from "./entities/product.entity";
@ApiTags('Products')
@ApiBearerAuth('access-token')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @RolesDecorator(Roles.ADMIN)
  @Post(":categoryId")
  create(@Param('categoryId') categoryId:number,@Body() createProductDto: CreateProductDto) {
    return this.productService.create(categoryId,createProductDto);
  }
  @Get()
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ProductEntity>> {
    return this.productService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}

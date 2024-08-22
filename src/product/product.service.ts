import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";
import { GlobalStateService } from "../global/global.service";
import { UsersService } from "../users/users.service";
import { CategoryService } from "../category/category.service";

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private productEntityRepository:Repository<ProductEntity>,
  private globalStateService: GlobalStateService,
              private categoryService: CategoryService) {
  }
 async create(categoryId:number,createProductDto: CreateProductDto):Promise<ProductEntity> {
    if(!this.globalStateService.getUserGlobal().id){
      throw new BadRequestException("createdBy can't be null")
    }
    const category= await this.categoryService.findById(categoryId);
    const user=this.globalStateService.getUserGlobal();
    const product= await this.productEntityRepository.create({...createProductDto,createdBy:user,category:category})
    return this.productEntityRepository.save(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

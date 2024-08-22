import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";
import { GlobalStateService } from "../global/global.service";
import { UsersService } from "../users/users.service";
import { CategoryService } from "../category/category.service";
import { ResponseProduct } from "./dto/product.dto";
import { PageDto } from "../utils/dto/page.dto";
import { PageOptionsDto } from "../utils/dtos/page.option.dto";
import { PageMetaDto } from "../utils/dto/page.meta.dto";

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private productEntityRepository:Repository<ProductEntity>,
  private globalStateService: GlobalStateService,
              private usersService: UsersService,
              private categoryService: CategoryService
  ) {
  }
  private queryBuilder = this.productEntityRepository.createQueryBuilder("products");
 async create(categoryId:number,createProductDto: CreateProductDto):Promise<ResponseProduct> {
   await this.duplicateName(createProductDto.name);
    const category= await this.categoryService.findById(categoryId);
    const user=this.globalStateService.validateUserLogin();
    const product = this.productEntityRepository.create({...createProductDto,createdBy:user,category:category})
   await this.productEntityRepository.save(product)
    return { createdById:user.id,categoryId:category.id,name:product.name,qty:product.qty,price:product.price};
  }

  async findAll( pageOptionsDto: PageOptionsDto):Promise<PageDto<ProductEntity>> {
    this.queryBuilder
      .orderBy(`products.${pageOptionsDto.orderBy}`, pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await this.queryBuilder.getCount();
    const { entities } = await this.queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number) {
    const product=await this.productEntityRepository.findOneBy({id});
    if(!product) throw new BadRequestException('Product not found')
    return this.productEntityRepository.findOneBy({id})
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async duplicateName(name: string) {
    const category = await this.productEntityRepository.findOne({where:{name}})
    if(category){
      throw new BadRequestException("Duplicate name of product");
    }
    return true;
  }
}

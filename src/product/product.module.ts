import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { GlobalStateModule } from "../global/global.module";
import { CategoryService } from "../category/category.service";
import { CategoryModule } from "../category/category.module";

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity]),GlobalStateModule,CategoryModule],
  controllers: [ProductController],
  providers: [ProductService],

})
export class ProductModule {}

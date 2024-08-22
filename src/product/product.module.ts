import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { GlobalStateModule } from "../global/global.module";

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity]),GlobalStateModule],
  controllers: [ProductController],
  providers: [ProductService],

})
export class ProductModule {}

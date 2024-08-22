import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { GlobalStateModule } from "../global/global.module";
import { CategoryModule } from "../category/category.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity]),GlobalStateModule,CategoryModule,UsersModule],
  controllers: [ProductController],
  providers: [ProductService],

})
export class ProductModule {}

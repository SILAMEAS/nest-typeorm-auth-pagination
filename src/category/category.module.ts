import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { UsersModule } from "../users/users.module";
import { GlobalStateModule } from '../global/global.module';
import { ProductModule } from "../product/product.module";

@Module({
  imports:[TypeOrmModule.forFeature([CategoryEntity]),UsersModule,GlobalStateModule,ProductModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

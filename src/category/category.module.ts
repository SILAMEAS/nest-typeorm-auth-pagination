import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { GlobalStateModule } from '../global/global.module';
import { UsersModule } from "../users/users.module";

@Module({
  imports:[TypeOrmModule.forFeature([CategoryEntity]),GlobalStateModule,UsersModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports:[CategoryService]
})
export class CategoryModule {}

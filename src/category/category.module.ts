import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { UsersModule } from "../users/users.module";

@Module({
  imports:[TypeOrmModule.forFeature([CategoryEntity]),UsersModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

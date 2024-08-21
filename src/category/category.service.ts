import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity)
              private categoryEntityRepository: Repository<CategoryEntity>,
              private usersService: UsersService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    // this.usersService.fi
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

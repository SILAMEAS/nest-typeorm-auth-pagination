import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { PageOptionsDto } from "../utils/dtos/page.option.dto";
import { PageDto } from "../utils/dto/page.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserEntity>> {
    return this.usersService.findAll(pageOptionsDto);
  }
  /** Library Pagination
   @Get()
    findAllWithL( @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,): Promise<Pagination<UserEntity>> {
    return this.usersService.paginate({limit,page});
    }
   * */

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

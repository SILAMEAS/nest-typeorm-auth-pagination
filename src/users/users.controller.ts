import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserSignupDto } from "./dto/user-signup.dto";
import { UserSignInDto } from "./dto/user-signIn.dto";
import { CurrentUserDecorators } from "../utils/decorators/current-user.decorators";
import { UserEntity } from "./entities/user.entity";
import { AuthenticationGuard } from "../utils/guards/authentication.guard";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  signup(@Body() body:UserSignupDto){
    return this.usersService.signup(body);
  }
  @Post('sign-in')
  async signIn(@Body() body:UserSignInDto){
     const user=await this.usersService.signIn(body);
     const accessToken=await this.usersService.accessToken(user);
     return {accessToken,user}
  }


  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get("JJ/JJ")
  findAllS() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
@UseGuards(AuthenticationGuard)
  @Get("me/me")
  getProfile(@CurrentUserDecorators() currentUser:UserEntity){
    return currentUser;
  }
}

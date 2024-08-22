import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from "@nestjs/common";
import { Public } from "./decorator/public.decorator";
import { UserSignupDto } from "../users/dto/user-signup.dto";
import { UserSignInDto } from "../users/dto/user-signIn.dto";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { GlobalStateService } from '../global/global.service';
@ApiTags("Auth")
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signup(@Body(ValidationPipe) body:UserSignupDto){
    return this.authService.signup(body)
  }
  @Public()
  @Post('sign-in')
  async signIn(@Body(ValidationPipe) body:UserSignInDto){
    const user=await this.authService.signIn(body);
    const accessToken=await this.authService.accessToken(user);
    return {accessToken,user}
  }
}

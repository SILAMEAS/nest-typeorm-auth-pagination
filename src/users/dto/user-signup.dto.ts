import { IsNotEmpty, IsString } from "class-validator";
import { UserSignInDto } from "./user-signIn.dto";

export class UserSignupDto extends UserSignInDto{
  @IsNotEmpty({message:"Name cannot be empty"})
  @IsString({message:"Name cannot be empty"})
  name:string;
}
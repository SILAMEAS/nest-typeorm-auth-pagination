import { IsNotEmpty, IsString } from "class-validator";
import { UserSignInDto } from "./user-signIn.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserSignupDto extends UserSignInDto{
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsNotEmpty({message:"Name cannot be empty"})
  @IsString({message:"Name cannot be empty"})
  name:string;
}
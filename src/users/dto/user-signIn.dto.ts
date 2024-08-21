import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserSignInDto{
  @ApiProperty({ example: 'sila@gmail.com', description: 'The email of the user' })
  @IsNotEmpty({message:"Email cannot be empty"})
  @IsEmail({},{message:"Please provide a valid email"})
  email:string;
  @ApiProperty({ example: '12345', description: 'The password for the user', minLength: 5 })
  @IsNotEmpty({message:"Password cannot be empty"})
  @MinLength(5,{message:"Password minimum character should be 5."})
  password:string;

}
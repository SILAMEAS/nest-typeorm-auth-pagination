import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignupDto{
  @IsNotEmpty({message:"Name cannot be empty"})
  @IsString({message:"Name cannot be empty"})
  name:string;
  @IsNotEmpty({message:"Email cannot be empty"})
  @IsEmail({},{message:"Please provide a valid email"})
  email:string;
  @IsNotEmpty({message:"Password cannot be empty"})
  @MinLength(5,{message:"Password minimum character should be 5."})
  password:string;

}
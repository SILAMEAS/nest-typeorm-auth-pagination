import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserSignInDto } from "./user-signIn.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Roles } from '../../utils/common/user-role.enum';

export class UserSignupDto extends UserSignInDto{
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsNotEmpty({message:"Name cannot be empty"})
  @IsString({message:"Name cannot be empty"})
  name:string;
  @ApiProperty({ example: 'Roles', description: '["admin","user"]' })
  @IsArray()
  @IsString({ each: true })
  roles:Roles[]
}
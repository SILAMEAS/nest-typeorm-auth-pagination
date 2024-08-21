import { IsArray, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Roles } from '../../utils/common/user-role.enum';
import { Order } from '../../utils/dtos/page.option.dto';
export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsOptional()
  @IsString()
  name: string;
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsArray()
  @IsString({ each: true })
  roles:Roles[]
}

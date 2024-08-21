import { IsEmail, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsOptional()
  @IsString()
  name: string;
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;
}

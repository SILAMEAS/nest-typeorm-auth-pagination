import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({ example: 'Fruit', description: 'The name of the Category' })
  @IsString()
  name:string
}

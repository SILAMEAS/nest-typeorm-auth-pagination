import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseCategoryDto {
  @IsString()
  name:string
  @IsNumber()
  id:number
  @IsNumber()
  createdById:number
}

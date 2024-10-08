import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ example: 'Apple', description: 'The name of the product' })
  @IsString()
  name: string;
  @ApiProperty({ example: 0, description: 'The price of the product' })
  @IsNumber()
  price: number;
  @ApiProperty({ example: 0, description: 'The qty of the product' })
  @IsNumber()
  qty:number
}

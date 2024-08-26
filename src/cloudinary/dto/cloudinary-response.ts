import { IsDate, IsNumber, IsString } from 'class-validator';

export class ResponseCloudinary {
  // @IsString()
  // asset_id: string;
  // @IsString()
  // public_id: string;
  // @IsString()
  // signature: string;
  // @IsNumber()
  // width: number;
  // @IsNumber()
  // height: number;
  @IsString()
  format: string;
  // @IsString()
  // resource_type: string;
  // @IsDate()
  // created_at: Date;
  @IsString()
  url: string;
  // @IsString()
  // secure_url:string
  @IsString()
  original_filename:string
  // @IsString()
  // api_key:string
}


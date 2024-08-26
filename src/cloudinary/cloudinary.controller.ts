import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Public } from '../auth/decorator/public.decorator';
import { ResponseCloudinary } from './dto/cloudinary-response';
@ApiTags('upload with cloudinary')
@ApiBearerAuth('access-token')
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {
  }
  @Public()
  @Post("/upload")
  @UseInterceptors(FileInterceptor('image') as any)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(@UploadedFile() image: Express.Multer.File):Promise<ResponseCloudinary> {
    return await this.cloudinaryService.uploadImage(image)
  }
}

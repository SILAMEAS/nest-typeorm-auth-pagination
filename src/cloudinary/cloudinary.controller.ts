import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary.service";

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {
  }
  @Get()
  sd(){
    return "JSKLDfj"
  }
  @Post("/upload")
  @UseInterceptors(FileInterceptor('image') as any)
  async uploadImage(@Param() id:string, @UploadedFile() image: Express.Multer.File) {
    try {
      return await this.cloudinaryService.uploadImage(image)
    }catch (e){
      return e
    }
  }
}

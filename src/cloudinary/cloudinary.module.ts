import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from "./cloudinary.config";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports:[ConfigModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService,CloudinaryProvider],
  exports:[CloudinaryProvider,CloudinaryService]
})
export class CloudinaryModule {}

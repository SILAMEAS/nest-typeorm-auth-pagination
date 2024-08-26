
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Provider } from '@nestjs/common';
import 'dotenv/config'
import * as process from 'process';

export const CloudinaryProvider: Provider = {
  provide: 'Cloudinary',
  useFactory: (configService: ConfigService) => {
    return cloudinary.config({
      cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret:process.env.CLOUDINARY_API_SECRET,
    });
  },
  inject: [ConfigService],
};
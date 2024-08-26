
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Provider } from '@nestjs/common';

export const CloudinaryProvider: Provider = {
  provide: 'Cloudinary',
  useFactory: (configService: ConfigService) => {
    return cloudinary.config({
      cloud_name: 'ddz6bkk0m',
      api_key: '675499539668193',
      api_secret:'32PfiKAo7glmYYLM5MOoXZ6KS0Q',
    });
  },
  inject: [ConfigService],
};
//CLOUDINARY_CLOUD_NAME='ddz6bkk0m'
// CLOUDINARY_API_KEY='675499539668193'
// CLOUDINARY_API_SECRET='32PfiKAo7glmYYLM5MOoXZ6KS0Q'
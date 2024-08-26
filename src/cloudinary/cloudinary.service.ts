import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse,v2 } from "cloudinary";
import * as streamifier from 'streamifier';
import { ResponseCloudinary } from './dto/cloudinary-response';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<ResponseCloudinary> {
    const uploadRes:ResponseCloudinary|null =await new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
         resolve(result);
      });
      streamifier.createReadStream(file.buffer).pipe(upload);

    });
    if(uploadRes){
      return uploadRes;
    }else
    return null
  }
}

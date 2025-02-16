import { Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileValidator } from '@nestjs/common';
import * as fileType from 'file-type-mime';

const PATH_IMAGE_SRC = './src/assets/avatar';

export interface CustomUploadTypeValidatorOptions {
  fileType: string[];
}

export class CustomUploadFileTypeValidator extends FileValidator {
  private _allowedMimeTypes: string[];

  constructor(
    protected readonly validationOptions: CustomUploadTypeValidatorOptions,
  ) {
    super(validationOptions);
    this._allowedMimeTypes = this.validationOptions.fileType;
  }

  public isValid(file?: any): boolean {
    const response = fileType.default(file.buffer)!;
    return this._allowedMimeTypes.includes(response.mime);
  }

  public buildErrorMessage(): string {
    return `Upload not allowed. Upload only files of type: ${this._allowedMimeTypes.join(
      ', ',
    )}`;
  }
}

@Injectable()
export class CustomMulterOptionsMenuImage {
  createMulterOptionsMenu(): MulterOptions {
    return {
      storage: diskStorage({
        destination: PATH_IMAGE_SRC,
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop();
          cb(null, `${uniqueSuffix}.${extension}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.png', '.jpeg', '.jpg', '.webp', '.gif'];
        const fileExt = extname(file.originalname).toLowerCase();
        const isValidExtension = allowedExtensions.includes(fileExt);

        if (!isValidExtension) {
          return cb(
            new BadRequestException(
              'Invalid image format (png | jpeg | jpg | webp | gif)!!!',
            ),
            false,
          );
        }
        cb(null, true);
      },
    };
  }
}

import {
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CustomMulterOptionsMenuImage } from 'src/common/config/multer.middleware';
import { Request } from 'express';
import { BaseResponse } from 'src/common/ultis/utils.response';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileMenu(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp|gif)' }),
        ],
      }),
    )
    files: any,
    @Res() res,
  ) {
    console.log('🚀 ~ UploadController ~ files:', files);
    return res.status(HttpStatus.OK).send(
      new BaseResponse({
        message: 'OK',
        data: await this.uploadService.uploadFile(files),
        status: HttpStatus.OK,
      }),
    );
  }

  @Get(':fileKey')
  async getFileUrl(@Param('fileKey') fileKey: string) {
    const fileUrl = await this.uploadService.getFileUrl(fileKey);
    return { url: fileUrl };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/ultis/utils.response';
import { query } from 'express';
import { QueryFind } from 'src/common/interface/interface';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async create(@Body() createProductDto: CreateProductDto, @Res() res) {
    const response = await this.productService.create(createProductDto);
    return res.status(HttpStatus.OK).send(
      new BaseResponse({
        message: 'Tạo sản phẩm thành công',
        data: response,
        status: HttpStatus.OK,
      }),
    );
  }

  @Get('/find-all')
  async findAll(@Query() query: QueryFind, @Res() res) {
    const response = await this.productService.findAll(query);
    return res.status(HttpStatus.OK).send(
      new BaseResponse({
        message: 'Lấy sản phẩm thành công',
        data: response,
        status: HttpStatus.OK,
      }),
    );
  }

  @Get('/find-one/:id')
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.productService.findOne(id);
    return res.status(HttpStatus.OK).send(
      new BaseResponse({
        message: 'Lấy sản phẩm thành công',
        data: response,
        status: HttpStatus.OK,
      }),
    );
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Res() res,
  ) {
    const response = await this.productService.findOne(id);
    return res.status(HttpStatus.OK).send(
      new BaseResponse({
        message: 'Lấy sản phẩm thành công',
        data: response,
        status: HttpStatus.OK,
      }),
    );
  }

  @Delete('/remove/:id')
  async remove(@Param('id') id: string, @Res() res) {
    const response = await this.productService.remove(id);
    return res.status(HttpStatus.OK).send(
      new BaseResponse({
        message: 'Xóa sản phẩm thành công',
        data: response,
        status: HttpStatus.OK,
      }),
    );
  }
}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    example: 'Máy in',
    description: 'Tên sản phẩm',
  })
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  @IsString({ message: 'Tên sản phẩm phải là dạng string' })
  name: string;

  @ApiProperty({
    example: 100,
    description: 'Số lượng còn lại trong kho',
  })
  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  @IsNumber()
  stock: number;

  @ApiProperty({
    example: 100,
    description: 'Giá sản phẩm',
  })
  @IsNotEmpty({ message: 'Giá sản phẩm không được để trống' })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Hình ảnh sản phẩm',
  })
  @IsNotEmpty({ message: 'Hình ảnh sản phẩm không được để trống' })
  @IsString({ message: 'Hình ảnh sản phẩm phải là dạng string' })
  image: string;
}

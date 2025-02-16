import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongooseDelete from 'mongoose-delete';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
})
export class Product {
  @ApiProperty({
    example: 'Mực in',
    description: 'Tên sản phẩm',
    type: String,
  })
  @Prop()
  name: string;

  @ApiProperty({
    example: 10,
    description: 'Số lượng còn lại trong kho',
    type: Number,
  })
  @Prop()
  stock: number;

  @ApiProperty({
    example: 200000,
    description: 'Giá tiền sản phẩm',
    type: Number,
  })
  @Prop()
  price: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Hình ảnh của sản phẩm',
    type: String,
  })
  @Prop()
  image: String;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

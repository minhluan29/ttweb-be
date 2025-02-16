import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongooseDelete from 'mongoose-delete';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AdminDocument = Admin & Document;

@Schema({
  timestamps: true,
})
export class Admin {
  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Tên admin',
    type: String,
  })
  @Prop()
  name: string;

  @ApiProperty({
    example: 'A@123456789',
    description: 'Mật khẩu admin',
    type: String,
  })
  @Prop()
  pwd: string;

  @ApiProperty({
    example: '127.0.0.1',
    description: 'Địa chỉ admin',
    type: String,
  })
  @Prop()
  ip: String;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Hình ảnh admin',
    type: String,
  })
  @Prop()
  image: String;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
AdminSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

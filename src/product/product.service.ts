import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { QueryFind } from 'src/common/interface/interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    return await this.productModel.create(createProductDto);
  }

  async findAll(query: QueryFind) {
    const limit = query.limit ? query.limit : 10;
    const page = query.page ? query.page : 1;
    const skip = (page - 1) * limit;
    const a = await this.productModel.find().limit(limit).skip(skip);
    console.log('🚀 ~ ProductService ~ findAll ~ a:', a);
    return a;
  }

  async findOne(id: string) {
    return await this.productModel.findById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.productModel.deleteOne({ _id: id });
  }
}

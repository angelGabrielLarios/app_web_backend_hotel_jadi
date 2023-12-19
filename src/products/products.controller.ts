import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  save(@Body() createProductDto: CreateProductDto) {
    return this.productsService.save(createProductDto);
  }

  @Get()
  findAllWithSection() {
    return this.productsService.findAllWithSection()
  }
  @Get('section/:section')
  findAllWithSectionBySection(@Param('section') section: string) {
    return this.productsService.findAllWithSectionByNameSection({
      nameSection: section
    })
  }

  @Get('insert')
  saveMultiple() {
    return this.productsService.saveMultiples()
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

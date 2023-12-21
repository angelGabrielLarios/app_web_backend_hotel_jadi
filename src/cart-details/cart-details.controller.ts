import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { CartDetailsService } from './cart-details.service';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { CartDetail } from './entities/cart-detail.entity';

@Controller('cart-details')
export class CartDetailsController {
  constructor(private readonly cartDetailsService: CartDetailsService) { }

  @Post()
  create(@Body() createCartDetailDto: CreateCartDetailDto) {
    return this.cartDetailsService.create(createCartDetailDto);
  }

  @Get()
  findAll() {
    return this.cartDetailsService.findAll();
  }

  @Get('search')
  findOneByIdProductAndIdShopping(
    @Query('idProduct') idProduct: string,
    @Query('idShoppingCart') idShoppingCart: string

  ) {

    console.log(idProduct)
    console.log(idShoppingCart)

    /* return this.cartDetailsService.findOneByIdProductAndIdShopping({ idProduct, idShoppingCart }) */
    /* return this.cartDetailsService.findOne(+id); */

    if (!idProduct || !idShoppingCart) {
      throw new BadRequestException(`query parameters are missing`, `query parameters are missing idProduct or idShoppingCart`)
    }

    /* return {
      idProduct, idShoppingCart
    } */

    return this.cartDetailsService.findOneByIdProductAndIdShopping({ idProduct, idShoppingCart })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() cartDetail: CartDetail) {
    return this.cartDetailsService.updateById({
      id,
      cartDetail
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartDetailsService.remove(+id);
  }
}

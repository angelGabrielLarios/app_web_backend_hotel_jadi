import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { CartDetailsService } from './cart-details.service';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { CartDetail } from './entities/cart-detail.entity';
import { UpdateCartDetailQuantity } from './dto/update-cart-detail-quantity.dto';

@Controller('cart-details')
export class CartDetailsController {
  constructor(private readonly cartDetailsService: CartDetailsService) { }

  @Post()
  create(@Body() createCartDetailDto: CreateCartDetailDto) {
    return this.cartDetailsService.create(createCartDetailDto);
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

  @Get('idShoppingCart/:idShoppingCart')
  findAllByIdShopping(@Param('idShoppingCart') idShoppingCart: string) {
    return this.cartDetailsService.findAllByIdShopping({ idShoppingCart })
  }


  @Get('subtotal-product')
  getSubTotalByProduct(
    @Query('idProduct') idProduct: string,
    @Query('idShoppingCart') idShoppingCart: string
  ) {

    if (!idProduct || !idShoppingCart) {
      throw new BadRequestException(`query parameters are missing`, `query parameters are missing idProduct or idShoppingCart`)
    }
    return this.cartDetailsService.getSubTotalByProduct({ idProduct, idShoppingCart })
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() cartDetail: CartDetail) {
    return this.cartDetailsService.updateById({
      id,
      cartDetail
    });
  }

  @Patch('update-quantity/:idCartDetails')
  updateQuantityById(@Param('idCartDetails') idCartDetails: string, @Body() updateCartDetailQuantity: UpdateCartDetailQuantity) {
    return this.cartDetailsService.updateQuantityById({
      id: idCartDetails,
      quantity: updateCartDetailQuantity.quantity
    })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartDetailsService.remove({ id });
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { StatusEnum } from './entities/shopping-cart.entity';


@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  @Post('add-product')
  addProductToCart(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.addProductToCart(createShoppingCartDto);
  }

  @Get()
  findAll() {
    return this.shoppingCartService.findAll();
  }

  @Get('idUser/:idUser')
  async findOneByIdUserAndStatus(@Param('idUser') idUser: string) {
    const shopping_cart = await this.shoppingCartService.findOneByIdUserAndStatus({
      idUser: idUser,
      status: StatusEnum.pending
    });


    if (!shopping_cart) {
      throw new NotFoundException(`shopping_cart_not_found`, `shopping_cart_not_found`)
    }
  }

  @Patch('change-status-complete/:shoppingCartId')
  changeStatusComplete(@Param('shoppingCartId') shoppingCartId: string) {

    return this.shoppingCartService.changeStatusComplete({ shoppingCartId })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoppingCartDto: UpdateShoppingCartDto) {
    return this.shoppingCartService.update(+id, updateShoppingCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingCartService.remove(+id);
  }
}

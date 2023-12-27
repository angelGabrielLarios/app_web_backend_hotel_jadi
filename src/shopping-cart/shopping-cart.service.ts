import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart, StatusEnum } from './entities/shopping-cart.entity';
import { Repository } from 'typeorm';
import { CartDetailsService } from 'src/cart-details/cart-details.service';


@Injectable()
export class ShoppingCartService {

  constructor(
    @InjectRepository(ShoppingCart)
    private shoppingCartRepository: Repository<ShoppingCart>,
    private cartDetailService: CartDetailsService,
  ) { }

  async create({ idUser }: { idUser: string }) {
    const shoppingCartRef = this.shoppingCartRepository.create({
      user: { id: idUser },
      status: StatusEnum.pending
    })

    const shoppingCart = await this.shoppingCartRepository.save(shoppingCartRef)

    return shoppingCart
  }
  async addProductToCart(createShoppingCartDto: CreateShoppingCartDto) {
    let shoppingCart: ShoppingCart = await this.findOneByIdUserAndStatus({
      idUser: createShoppingCartDto.idUser,
      status: StatusEnum.pending
    })

    const addQuantity = 1


    if (!shoppingCart) {
      shoppingCart = await this.create({
        idUser: createShoppingCartDto.idUser,

      })
    }

    const existCartDetail = await this.cartDetailService.findOneByIdProductAndIdShopping({
      idProduct: createShoppingCartDto.idProduct, idShoppingCart: shoppingCart.id
    })

    if (existCartDetail) {

      const prevQuantity = existCartDetail.quantity
      const cartDetail = await this.cartDetailService.updateById({
        id: existCartDetail.id,
        cartDetail: {
          ...existCartDetail,
          quantity: prevQuantity + 1
        }
      })

      return cartDetail
    }


    const cartDetail = await this.cartDetailService.create({
      idProduct: createShoppingCartDto.idProduct,
      quantity: addQuantity,
      idShoppingCart: shoppingCart.id,
    })

    return cartDetail

  }
  findAll() {
    return `This action returns all shoppingCart`;
  }

  async findOneByIdUserAndStatus({ idUser, status }: { idUser: string, status: StatusEnum }) {
    const shoppingCart = await this.shoppingCartRepository.findOne({
      where: {
        user: {
          id: idUser
        },
        status: status
      }
    })

    return shoppingCart
  }


  async changeStatusComplete({ shoppingCartId }: { shoppingCartId: string }) {
    const shoppingCart = await this.shoppingCartRepository.findOneBy({ id: shoppingCartId })
    if (!shoppingCart) {
      throw new NotFoundException(`not_found_shopping_cart`, `not_found_shopping_cart`)
    }
    const updateShoppingCart = await this.shoppingCartRepository.update({ id: shoppingCartId }, {
      status: StatusEnum.complete
    })

    return updateShoppingCart
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return `This action updates a #${id} shoppingCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
